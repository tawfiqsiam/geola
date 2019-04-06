module.exports = async (client, oldChannel, newChannel) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const deepEqual = require("deep-equal");
    const modules = client.modules.channelUpdate;

    //No changes
    if (oldChannel.position !== newChannel.position) return;
    if (!deepEqual(
        oldChannel.permissionOverwrites.array().map(p => ({ id: p.id, type: p.type, allow: p.allow, deny: p.deny })),
        newChannel.permissionOverwrites.array().map(p => ({ id: p.id, type: p.type, allow: p.allow, deny: p.deny }))
    )) return;

    //Get server data
    const serverData = await models.servers.findById(newChannel.guild.id);

    //Log
    const logChannel = newChannel.guild.channels.get(serverData.logChannels && serverData.logChannels.channelUpdate);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, oldChannel, newChannel) });

        //Update owner logs stat
        const owner = client.users.get(newChannel.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Channels Edited");
};