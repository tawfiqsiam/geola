module.exports = (client, currencySync, { server }) => {

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Set currency sync
    server.data.xp.currencySync = currencySync ? true : undefined;
};