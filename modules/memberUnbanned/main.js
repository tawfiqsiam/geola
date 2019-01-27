module.exports = async (client, guild, user) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.memberUnbanned;

    //Get server data
    const serverData = await models.servers.findById(guild.id);

    //Log
    const logChannel = guild.channels.get(serverData.logChannels && serverData.logChannels.memberUnbanned);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, guild, user) });

        //Update owner logs stat
        const owner = client.users.get(guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Members Unbanned");
};