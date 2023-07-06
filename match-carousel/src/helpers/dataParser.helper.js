export const getSport = async (sportId) => {
    const res = await fetch('https://lmt.fn.sportradar.com/demolmt/en/Etc:UTC/gismo/event_fullfeed/0/1/12074');
    const body = await res.json();
    const sports = body.doc[0].data;

    if (!sports || sports.length === 0) {
        throw new Error('Could not get the sports');
    }

    let chosenSport;
    if (sportId) {
        chosenSport = sports.find((s) => s._id === sportId);
    } else {
        const randomIndex = Math.floor(Math.random() * sports.length);
        chosenSport = sports[randomIndex];
    }
    return chosenSport;
};