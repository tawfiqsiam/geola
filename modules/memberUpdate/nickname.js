module.exports = async (client, oldMember, newMember) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Get server data
    const serverData = await models.servers.findById(newMember.guild.id);

    //Nickname remembrance
    const memberData = await models.members.findByIdAndUpdate({ server: newMember.guild.id, user: newMember.id }, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    memberData.nickname = newMember.nickname || undefined;
    await _.save(client, memberData);

    //Log
    const logChannel = newMember.guild.channels.get(serverData.logChannels && serverData.logChannels.memberUpdate);
    if ((logChannel) && (newMember.joinedTimestamp < Date.now() - 3000)) {

        let audit = await newMember.guild.fetchAuditLogs({ limit: 1 });
        audit = audit.entries.array()[0];

        //Embed
        const embed = new Discord.RichEmbed()
            .setTitle("Member Edited")
            .setDescription(`${newMember} (${newMember.user.tag})`)
            .setColor(_.colors.good)
            .addField("Nickname", `${oldMember.nickname || "*None*"} >> ${newMember.nickname || "*None*"}`)
            .addField("Member Editor", `${audit.executor} (${audit.executor.id})`)
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