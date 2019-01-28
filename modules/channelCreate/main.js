module.exports = async (client, channel) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.channelCreate;

    //Ignore dms
    if (channel.type === "dm") return;

    //Create doc
    models.channels.create({ _id: channel.id });

    //Get server data
    const serverData = await models.servers.findById(channel.guild.id);
    if (!serverData) return;

    //Log
    const logChannel = channel.guild.channels.get(serverData.logChannels && serverData.logChannels.channelCreate);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, channel) });

        //Update owner logs stat
        const owner = client.users.get(channel.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Channels Created");
};