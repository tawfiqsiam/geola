module.exports = async (client, member) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.memberJoin;
    let addRoles = [];

    //Get server data
    const serverData = await models.servers.findById(member.guild.id);

    //Global banned
    if ((serverData.globalBanProtection) && (await _.globalBanned(client, member.user))) {
        member.ban();
        _.stats(client, "Global Bans");
        return;
    }

    //Create docs
    await models.users.create({ _id: member.id, bot: member.user.bot }).catch(() => { });
    await models.members.create({ _id: { server: member.guild.id, user: member.id }, bot: member.user.bot }).catch(() => { });

    //Log
    const logChannel = member.guild.channels.get(serverData.logChannels && serverData.logChannels.memberJoin);
    if (logChannel) {

        //Send
        logChannel.send({ embed: modules.log(client, member) });

        //Update owner logs stat
        const owner = client.users.get(member.guild.ownerID);
        owner.data = await models.users.findById(owner.id);
        owner.data.stats.logs = owner.data.stats.logs + 1 || 1;
        await _.logBadgeCheck(client, owner);
        owner.data.markModified("stats.logs");
        owner.data.markModified("inv");
        await _.save(client, owner.data);
    }

    //Welcome message
    const welcomeChannel = member.guild.channels.get(serverData.welcomeChannel);
    if (welcomeChannel && serverData.welcomeMessage) {

        welcomeChannel.send(
            serverData.welcomeMessage
                .replace(/{@user}/ig, member)
                .replace(/{user}/ig, member.user.username)
                .replace(/{tag}/ig, member.user.tag)
                .replace(/{userid}/ig, member.id)
                .replace(/{server}/ig, member.guild.name)
                .replace(/{serverid}/ig, member.guild.id)
                .replace(/{members}/ig, member.guild.memberCount)
                .replace(/{membercount}/ig, member.guild.memberCount)
        );

        _.stats(client, "Welcome Messages Sent");
    }

    //Remembrance
    const memberData = await models.members.findById({ server: member.guild.id, user: member.id });
    if ((serverData.rememberedRoles) && (memberData.roles)) addRoles = addRoles.concat(memberData.roles.filter(r => serverData.rememberedRoles.includes(r)));
    if ((serverData.nicknameRemembrance) && (memberData.nickname)) member.setNickname(memberData.nickname);

    //Autorole
    if (serverData.autoroles) {
        addRoles = addRoles.concat(serverData.autoroles);
        _.stats(client, "Autoroles Added", serverData.autoroles.length);
    }

    //Set roles
    member.addRoles([...new Set(addRoles)]);

    //Stats
    _.stats(client, "Members Joined");
};