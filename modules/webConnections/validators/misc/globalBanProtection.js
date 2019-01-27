module.exports = (client, globalBanProtection, { server }) => {

    //Set global ban protection
    server.data.globalBanProtection = globalBanProtection ? true : undefined;
};