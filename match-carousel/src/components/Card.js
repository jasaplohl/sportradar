import './Card.css';
import BgLive from '../assets/bg-live.jpg';
import BgPostMatch from '../assets/bg-postmatch.jpg';
import BgPreMatch from '../assets/bg-prematch.jpg';

const getStatusImage = (statusId) => {
    if (statusId === 0) {
        return BgPreMatch;
    } else if (statusId === 100) {
        return BgPostMatch;
    } else {
        return BgLive;
    }
};

const Card = (props) => {
    const match = props.match;
    if (!match) {
        return null;
    }
    return(
        <div className="card">
            <img src={getStatusImage(match.status._id)} alt="Match status" className="card-background-img" />
            <div className="card-header">
                <h2>{ props.tournament }</h2>
                <p>{ props.category }</p>
            </div>
            <div className="card-details">
                <div className="team">
                    <img className="flag" src={`http://img.sportradar.com/ls/crest/big/${match.teams.home.uid}.png`} alt="Crest"/>
                    <h1>{match.teams.home.abbr}</h1>
                </div>
                <div>
                    <h2>VS</h2>
                    <h2>21:00</h2>
                    <p>23/12/13</p>
                </div>
                <div  className="team">
                    <img className="flag" src={`http://img.sportradar.com/ls/crest/big/${match.teams.away.uid}.png`} alt="Crest"/>
                    <h1>{match.teams.away.abbr}</h1>
                </div>
            </div>
            <div className="card-footer">
                <p className="pill">{match.status.name}</p>
            </div>
        </div>
    );
};

export default Card;