module.exports = async (client, member) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.memberLeave;

    //Get server data
    const serverData = await models.servers.findById(member.guild.id);

    //Global banned
    if ((serverData.globalBanProtection) && (await _.globalBanned(client, member.user))) return;

    //Log
    const logChannel = member.guild.channels.get(serverData.logChannels && serverData.logChannels.memberLeave);
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

    //Leave message
    const leaveChannel = member.guild.channels.get(serverData.leaveChannel);
    if (leaveChannel && serverData.leaveMessage) {

        leaveChannel.send(
            serverData.leaveMessage
                .replace(/{@user}/ig, member)
                .replace(/{user}/ig, member.user.username)
                .replace(/{tag}/ig, member.user.tag)
                .replace(/{userid}/ig, member.id)
                .replace(/{server}/ig, member.guild.name)
                .replace(/{serverid}/ig, member.guild.id)
                .replace(/{members}/ig, member.guild.memberCount)
                .replace(/{membercount}/ig, member.guild.memberCount)
        );

        _.stats(client, "Leave Messages Sent");
    }

    //Stats
    _.stats(client, "Members Left");
};