import './CarouselNav.css';

const CarouselNav = ({ matchList, callback, currentMatch }) => {
    const buttons = matchList?.map((match, index) => {
        return (
            <div
                key={match._id}
                className={`carousel-btn ${index === currentMatch && "carousel-btn-active"}`}
                onClick={callback}
                data-index={index}
            ></div>
        );
    });
    return (
        <div className="flex justify-center gap-md">
            { buttons }
        </div>
    );
};

export default CarouselNav;