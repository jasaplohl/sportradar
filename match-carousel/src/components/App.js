import './App.css';
import MatchCarousel from "./MatchCarousel";

const App = () => {
    return(
        <div className="app">
            <header>
                <p>Navigation between the two tabs</p>
                <p>First tab displays a single carousel with max 10 matches</p>
                <p>Second tab displays a two carousels for different sports</p>
            </header>
            <MatchCarousel sportId={1} />
            <MatchCarousel max={15}/>
        </div>
    );
}

export default App;
