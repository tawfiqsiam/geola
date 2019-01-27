module.exports = async (client, messages) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.messagesPruned;

    //Get data
    const message = messages.array()[0];
    const serverData = await models.servers.findById(message.guild.id);
    const channelData = await models.channels.findById(message.channel.id);

    //Ignored channel
    if (channelData.ignoreDeletedMessages) return;

    //Log
    const logChannel = message.guild.channels.get(serverData.logChannels && serverData.logChannels.messagesPruned);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, messages) });

        //Update owner logs stat
        const owner = client.users.get(message.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }
};