import './App.css';
import MatchCarousel from "./MatchCarousel";

const App = () => {
    return(
        <div className="app">
            <header>
                <p>Navigation between the two tabs</p>
            </header>
            <MatchCarousel sportId={1} />
            <MatchCarousel max={15}/>
        </div>
    );
}

export default App;
