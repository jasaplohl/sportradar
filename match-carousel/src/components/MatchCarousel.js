import { Component } from 'react';
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
        console.log(chosenSport);
    }

    getCategoryDropdown = () => {
        const options = this.state.sport?.realcategories.map((category, index) => {
            return (
                <option key={category._id} value={index}>{ category.name }</option>
            );
        });
        return (
            <select value={this.state.category} onChange={this.onCategoryChange}>
                { options }
            </select>
        );
    }

    onCategoryChange = (event) => {
        this.setState({
            category: event.target.value,
        });
    }

    getMatchCards = () => {
        const category = this.state.sport?.realcategories[this.state.category];
        const tournament = category?.tournaments[this.state.tournament];
        const max = this.props.max || 10;
        const cards = [];
        for (let i=0; i<Math.min(max, tournament.matches.length); i++) {
            const match = tournament.matches[i];
            cards.push(
                <Card
                    key={match._id}
                    category={category.name}
                    tournament={`${tournament.name} - ${tournament.seasontypename}`}
                    match={match}
                />
            );
        }
        return cards;
    }

    render() {
        if (!this.state.sport) {
            return(
                <div className="flex justify-center">
                    <Dna />
                </div>
            );
        }
        return(
            <div className="container">
                <div className="flex gap-1">
                    <h1>{ this.state.sport.name }</h1>
                    { this.getCategoryDropdown() }
                </div>
                {/* TODO: pills for categories */}
                <div className="flex">
                    <div className="carousel">{ this.getMatchCards() }</div>
                </div>
            </div>
        );
    }
};