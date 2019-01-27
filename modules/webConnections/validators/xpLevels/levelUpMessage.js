module.exports = (client, levelUpMessage, { server }) => {

    //Over 2000 chars
    if (levelUpMessage.length > 2000) return;

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Remove level up message
    if (levelUpMessage === "") return server.data.xp.levelUpMessage = undefined;

    //Set level up message
    server.data.xp.levelUpMessage = levelUpMessage;
};