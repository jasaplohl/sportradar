import {Component} from 'react';
import './MatchCarousel.css';
import Card from './Card';
import { Dna } from 'react-loader-spinner';

export default class MatchCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: undefined,
            category: 0,
            tournament: 0,
            currentMatch: 0,
            error: undefined
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    fetchData = async () => {
        try {
            const res = await fetch('https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074');
            const body = await res.json();
            const sports = body.doc[0].data;
            this.parseSports(sports);
        } catch(err) {
            // TODO: display error message
            console.error(err);
            this.state.error = err;
        }
    }

    parseSports = (sports) => {
        if (!sports || sports.length === 0) {
            throw new Error('Could not get the sports');
        }
        let chosenSport;
        if (this.props.sportId) {
            chosenSport = sports.find((s) => s._id === this.props.sportId);
        } else {
            const randomIndex = Math.floor(Math.random() * sports.length);
            chosenSport = sports[randomIndex];
        }
        this.setState({
            sport: chosenSport,
        });
    }

    getCategoryDropdown = () => {
        const options = this.state.sport?.realcategories.map((category, index) => {
            return (
                <option key={category._id} value={index}>{ category.name }</option>
            );
        });

        const onCategoryChange = (event) => {
            this.setState({
                category: event.target.value,
                tournament: 0,
                currentMatch: 0,
            });
        };

        return (
            <select onChange={onCategoryChange}>
                { options }
            </select>
        );
    }

    getTournamentDropdown = () => {
        const category = this.state.sport?.realcategories[this.state.category];
        const options = category?.tournaments.map((tournament, index) => {
            return (
                <option key={tournament._id} value={index}>{ tournament.name }</option>
            );
        });

        const onTournamentChange = (event) => {
            this.setState({
                tournament: event.target.value,
                currentMatch: 0,
            });
        };

        return (
            <select onChange={onTournamentChange}>
                { options }
            </select>
        );
    }

    getMatches = () => {
        const category = this.state.sport?.realcategories[this.state.category];
        const tournament = category?.tournaments[this.state.tournament];
        if (!tournament) {
            return null;
        }
        const max = Math.min(this.props.max || 10, tournament.matches.length);
        return tournament.matches.slice(0, max);
    };

    getMatchCards = () => {
        const category = this.state.sport?.realcategories[this.state.category];
        const tournament = category?.tournaments[this.state.tournament];
        const matches = this.getMatches();
        return matches?.map((match) => {
            return (
                <Card
                    key={match._id}
                    category={category.name}
                    tournament={tournament.seasontypename ? `${tournament.name} - ${tournament.seasontypename}` : tournament.name}
                    match={match}
                />
            );
        });
    }

    getCarouselButtons = () => {
        const matches = this.getMatches();

        const onBtnClick = (event) => {
            const index = event.target.getAttribute('data-index');
            this.setState({
                currentMatch: Number(index)
            });
        };

        return matches?.map((match, index) => {
            return (
                <div key={match._id} className={`carousel-btn ${index === this.state.currentMatch && "carousel-btn-active"}`} onClick={onBtnClick} data-index={index}></div>
            );
        });
    }

    render() {
        if (!this.state.sport) {
            return(
                <div className="carousel-container flex justify-center">
                    <Dna />
                </div>
            );
        }
        return(
            <div className="carousel-container flex flex-col gap-lg">
                <h1>{ this.state.sport.name }</h1>
                <div className="carousel-filters">
                    { this.getCategoryDropdown() }
                    { this.getTournamentDropdown() }
                </div>
                <div className="carousel">
                    <div className="carousel-inner" style={{ transform: `translateX(${-this.state.currentMatch*100}%)` }}>
                        { this.getMatchCards() }
                    </div>
                </div>
                <div className="flex justify-center gap-md">{this.getCarouselButtons()}</div>
            </div>
        );
    }
};
