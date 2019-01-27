module.exports = async (client, oldRole, newRole) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.roleUpdate;

    //No changes
    if ((oldRole.position !== newRole.position) || (newRole.id === newRole.guild.id)) return;

    //Get server data
    const serverData = await models.servers.findById(newRole.guild.id);

    //Log
    const logChannel = newRole.guild.channels.get(serverData.logChannels && serverData.logChannels.roleUpdate);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, oldRole, newRole) });

        //Update owner logs stat
        const owner = client.users.get(newRole.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Roles Edited");
};