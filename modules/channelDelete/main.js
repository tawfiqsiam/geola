module.exports = async (client, channel) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.channelDelete;

    //Ignore dms
    if (channel.type === "dm") return;

    //Delete doc
    models.channels.findByIdAndDelete(channel.id).exec();

    //Get server data
    const serverData = await models.servers.findById(channel.guild.id);

    //Log
    const logChannel = channel.guild.channels.get(serverData.logChannels && serverData.logChannels.channelDelete);
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
    await _.stats(client, "Channels Deleted");
};