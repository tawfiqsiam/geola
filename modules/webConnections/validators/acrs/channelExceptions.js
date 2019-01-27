module.exports = (client, { id, data: channelExceptions }, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set channel exceptions
    acr.whitelistedChannels = [];
    acr.blacklistedChannels = [];
    channelExceptions.forEach(c => {
        if (c.data === "whitelist") acr.whitelistedChannels.push(c.channel);
        else if (c.data === "blacklist") acr.blacklistedChannels.push(c.channel);
    });
};