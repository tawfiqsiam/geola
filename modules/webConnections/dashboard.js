module.exports = async (client, data) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret: data.clientSecret });
    if (!userData) return;

    //Get server + data
    const server = client.guilds.get(data.id);
    if (!server) return;
    const serverData = await models.servers.findById(server.id);

    //User isnt a mod
    const member = await server.fetchMember(userData._id);
    if ((!member) || (!member.hasPermission("MANAGE_GUILD"))) return;

    //Get + parse channel data
    const textChannels = server.channels.filter(c => c.type === "text");
    const rawChannelData = await models.channels.find({ _id: { $in: [...textChannels.keyArray()] } });
    const channelData = {};
    rawChannelData.forEach(c => channelData[c._id] = {
        disabledCommands: c.disabledCommands,
        xpGain: c.xpGain === false ? false : true,
        ignoreDeletedMessages: Boolean(c.ignoreDeletedMessages),
        counting: Boolean(c.counting)
    });

    //Fetch members + data
    await server.fetchMembers();
    const rawMemberData = await models.members.find({ "_id.server": server.id });

    //Parse member data
    const memberData = {};
    rawMemberData.forEach(m => memberData[m._id.user] = {
        currency: m.currency,
        xpBlacklisted: Boolean(m.xp.blacklisted)
    });

    //Parse server data: Main
    const serverDataLean = serverData.toObject();
    serverDataLean.name = server.name;

    //Parse server data: Channels
    serverDataLean.channels = textChannels
        .map(c => Object.assign({ id: c.id, name: c.name }, channelData[c.id]))
        .sort((a, b) => server.channels.get(a.id).calculatedPosition - server.channels.get(b.id).calculatedPosition);

    //Parse server data: Roles
    serverDataLean.roles = server.roles
        .filter(r => (r.id !== server.id) && (!r.managed))
        .map(r => ({ id: r.id, name: r.name }))
        .sort((a, b) => server.roles.get(b.id).calculatedPosition - server.roles.get(a.id).calculatedPosition);

    //Parse server data: Members
    serverDataLean.members = server.members.map(m => ({
        id: m.id,
        tag: m.user.tag,
        currency: memberData[m.id] && memberData[m.id].currency,
        xpBlacklisted: memberData[m.id] && memberData[m.id].xpBlacklisted
    }));

    //Parse server data: Commands
    serverDataLean.commands = _.commands.filter(c => (c.access === "everyone") && (!c.noToggle)).map(c => c.name);

    //Return
    return serverDataLean;
};