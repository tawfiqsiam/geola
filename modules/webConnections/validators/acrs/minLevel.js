module.exports = (client, { id, data: minLevel }, { server }) => {

    //No min level provided
    if ((isNaN(minLevel)) || (minLevel === null)) return;

    //Over 1000000000 (1 billion)
    if (minLevel > 1000000000) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set min level
    acr.minLevel = minLevel;
};