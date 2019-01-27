module.exports = async (client, oldMember, newMember) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Get server data
    const serverData = await models.servers.findById(newMember.guild.id);

    //Get roles
    const oldRoles = [...oldMember.roles.keys()];
    const newRoles = [...newMember.roles.keys()];
    oldRoles.splice(oldRoles.indexOf(newMember.guild.id), 1);
    newRoles.splice(newRoles.indexOf(newMember.guild.id), 1);

    //Role remembrance
    const memberData = await models.members.findById({ server: newMember.guild.id, user: newMember.id });
    memberData.roles = newRoles;
    await _.save(client, memberData);

    //Log
    const logChannel = newMember.guild.channels.get(serverData.logChannels && serverData.logChannels.memberUpdate);
    if ((logChannel) && (newMember.joinedTimestamp < Date.now() - 3000)) {

        const type = newMember.roles.size > oldMember.roles.size ? "add" : "remove";
        const role = newMember.guild.roles.get(type === "add" ? newRoles.find(r => !oldRoles.includes(r)) : oldRoles.find(r => !newRoles.includes(r)));

        //Embed
        const embed = new Discord.RichEmbed()
            .setTitle(`Role ${type === "add" ? "Added" : "Removed"}`)
            .setDescription(`${newMember} (${newMember.user.tag})`)
            .setColor(_.colors[type === "add" ? "good" : "bad"])
            .addField("Role", `${role.name} (${role.id})`)
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