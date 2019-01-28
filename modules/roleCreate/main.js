module.exports = async (client, role) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.roleCreate;

    //Get server data
    const serverData = await models.servers.findById(role.guild.id);
    if (!serverData) return;

    //Log
    const logChannel = role.guild.channels.get(serverData.logChannels && serverData.logChannels.roleCreate);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, role) });

        //Update owner logs stat
        const owner = client.users.get(role.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Roles Created");
};