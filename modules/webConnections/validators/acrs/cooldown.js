module.exports = (client, { id, data: cooldown }, { server }) => {

    //No cooldown provided
    if ((isNaN(cooldown)) || (cooldown === null)) return;

    //Over 2592000000 ms (30 days)
    if (cooldown > 2592000000) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set cooldown
    acr.cooldown = cooldown;
};