import { Component } from 'react';
import './MatchCarousel.css';
import Card from './Card';
import { Dna } from 'react-loader-spinner';
import DropDown from './DropDown';
import { getSport } from '../helpers/dataParser.helper';

export default class MatchCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: undefined,
            category: 0,
            tournament: 0,
            currentMatch: 0,
            error: undefined,
            timerId: undefined
        };
    }

    async componentDidMount() {
        try {
            this.setState({
                sport: await getSport(this.props.sportId),
            });
            this.debounce(this.nextCard); // Trigger the carousel animation
        } catch(err) {
            // TODO: display error message
            console.error(err);
            this.state.error = err;
        }
    }

    debounce = (callback, timeout = 3000) => {
        clearTimeout(this.state.timerId);
        this.setState({
            timerId: setTimeout(callback, timeout),
        });
    }

    nextCard = (matchIndex) => {
        if (matchIndex || matchIndex === 0) {
            this.setState({
                currentMatch: matchIndex,
            });
        } else {
            const matches = this.getMatches();
            if (matches) {
                this.setState({
                    currentMatch: this.state.currentMatch === matches.length - 1 ? 0 : this.state.currentMatch + 1,
                });
            }
        }
        this.debounce(this.nextCard);
    }

    onTournamentChange = (event) => {
        this.setState({
            tournament: event.target.value,
            currentMatch: 0,
        });
    };

    onCategoryChange = (event) => {
        this.setState({
            category: event.target.value,
            tournament: 0,
            currentMatch: 0,
        });
    };

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
            this.nextCard(Number(index));
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
                    <DropDown
                        label="Categories"
                        options={this.state.sport.realcategories}
                        callback={this.onCategoryChange}
                    />
                    <DropDown
                        label="Tournaments"
                        options={this.state.sport.realcategories[this.state.category].tournaments}
                        callback={this.onTournamentChange}
                    />
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
