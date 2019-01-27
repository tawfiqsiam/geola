module.exports = async (client, oldMember, newMember) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Get server data
    const serverData = await models.servers.findById(newMember.guild.id);

    //Nickname remembrance
    const memberData = await models.members.findById({ server: newMember.guild.id, user: newMember.id });
    memberData.nickname = newMember.nickname || undefined;
    await _.save(client, memberData);

    //Log
    const logChannel = newMember.guild.channels.get(serverData.logChannels && serverData.logChannels.memberUpdate);
    if (logChannel) {

        //Embed
        const embed = new Discord.RichEmbed()
            .setTitle("Member Edited")
            .setDescription(`${newMember} (${newMember.user.tag})`)
            .setColor(_.colors.good)
            .addField("Nickname", `${oldMember.nickname || "*None*"} >> ${newMember.nickname || "*None*"}`)
            .setTimestamp();

        //Send
        logChannel.send(embed);

        //Update owner logs stat
        const owner = client.users.get(newMember.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }
};