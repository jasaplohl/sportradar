import './App.css';
import MatchCarousel from './MatchCarousel';
import {useState} from 'react';

// TODO: Testing and vitals

const getTabContent = (tab) => {
    if (tab === 0) {
        return (
            <div key={0} className="content">
                <MatchCarousel max={10} />
            </div>
        );
    } else {
        return (
            <div key={1} className="content">
                <MatchCarousel sportId={1} />
                <MatchCarousel />
            </div>
        );
    }
}

const App = () => {
    const [tab, setTab] = useState(0);
    return(
        <div className="app">
            <header>
                <nav>
                    <button onClick={() => setTab(0)} className="nav-btn">First tab</button>
                    <button onClick={() => setTab(1)} className="nav-btn">Second tab</button>
                </nav>
            </header>
            { getTabContent(tab) }
        </div>
    );
}

export default App;
