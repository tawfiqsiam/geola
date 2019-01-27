module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.messageDelete;

    //Ignore dms
    if (message.channel.type === "dm") return;

    //No message
    if (message.content === "") return;

    //Get data
    const serverData = await models.servers.findById(message.guild.id);
    const channelData = await models.channels.findById(message.channel.id);

    //Counting channel
    if (channelData.counting) return;

    //Ignored channel
    if (channelData.ignoreDeletedMessages) return;

    //Invalid message
    if (message.content.toLowerCase().startsWith(`${serverData.prefix}say`)) return;
    if (message.content.toLowerCase().startsWith(`${serverData.modPrefix}prune`)) return;

    //Log
    const logChannel = message.guild.channels.get(serverData.logChannels && serverData.logChannels.messageDelete);
    if (logChannel) {

        //Send
        logChannel.send({ embed: modules.log(client, message) });

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