module.exports = async (client, oldEmoji, newEmoji) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.emojiUpdate;

    //Get server data
    const serverData = await models.servers.findById(newEmoji.guild.id);

    //Log
    const logChannel = newEmoji.guild.channels.get(serverData.logChannels && serverData.logChannels.emojiUpdate);
    if (logChannel) {

        //Send
        logChannel.send({ embed: await modules.log(client, oldEmoji, newEmoji) });

        //Update owner logs stat
        const owner = client.users.get(newEmoji.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Stats
    await _.stats(client, "Emojis Edited");
};