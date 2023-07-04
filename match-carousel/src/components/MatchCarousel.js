import React from "react";
import './MatchCarousel.css';
import Card from "./Card";

export default class MatchCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sport: undefined,
            error: undefined
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    async fetchData() {
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

    parseSports(sports) {
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

    render() {
        return(
            <div>
                <p>Sport: { this.state.sport?.name }</p>
                <div className="carousel">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        );
    }
};