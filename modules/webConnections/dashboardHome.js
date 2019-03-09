module.exports = async (client, loginData) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret: loginData.clientSecret });
    if (!userData) return;

    //Get server + data
    const server = client.guilds.get(loginData.id);
    if (!server) return;

    //User isnt a mod
    const thisMember = await server.fetchMember(userData._id);
    if ((!thisMember) || (!thisMember.hasPermission("MANAGE_GUILD"))) return;

    //Return
    return {
        name: server.name
    };
};