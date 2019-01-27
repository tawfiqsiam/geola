module.exports = (client, cooldown, { server }) => {

    //No cooldown provided
    if ((isNaN(cooldown)) || (cooldown === null)) return;

    //Over 86400000
    if (cooldown > 86400000) return;

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Remove cooldown
    if (cooldown === "") return server.data.xp.cooldown = undefined;

    //Set cooldown
    server.data.xp.cooldown = cooldown;
};