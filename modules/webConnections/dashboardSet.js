module.exports = async (client, loginData, data) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const validators = client.modules.webConnections.validators;

    //Get user data
    let userData = await models.users.findOne({ clientSecret: loginData.clientSecret });
    if (!userData) return;

    //Get server + data
    const server = client.guilds.get(loginData.id);
    if (!server) return;
    server.data = await models.servers.findById(server.id);

    //User isnt a mod
    const thisMember = await server.fetchMember(userData._id);
    if ((!thisMember) || (!thisMember.hasPermission("MANAGE_GUILD"))) return;

    //Fetch member + data
    const member = await _.promise(server.fetchMember(data.id), true);
    if (member) member.data = await models.members.findById({ server: server.id, user: member.id });

    //Fetch channel + data
    const channel = server.channels.get(data.id);
    if (channel) channel.data = await models.channels.findById(channel.id);

    //Validate data
    for (let d in data) {

        let validator = validators[loginData.type] && validators[loginData.type][d];
        if (validator) await validator(
            client,
            data.id ? { id: data.id, data: data[d], allData: data } : data[d],
            { server, channel, member }
        );
    }

    //Save data
    const savePromises = [];
    savePromises.push(_.save(client, server.data));
    if (channel) savePromises.push(_.save(client, channel.data));
    if (member) savePromises.push(_.save(client, member.data));

    await Promise.all(savePromises);
};