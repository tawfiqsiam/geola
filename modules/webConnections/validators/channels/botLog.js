module.exports = (client, { id, data: botLog }, { server }) => {

    //Prepare log channels object
    if (!server.data.logChannels) server.data.logChannels = {};

    //Loop through log channels
    botLog.forEach(bl => {
        if (
            !server.data.logChannels[bl.name] ||
            id === server.data.logChannels[bl.name] ||
            bl.value
        ) server.data.logChannels[bl.name] = bl.value ? id : undefined;
    });
};