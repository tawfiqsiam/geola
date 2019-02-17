module.exports = async (client, data) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret: data.clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};
    data.user = client.users.get(userData._id) || await client.fetchUser(userData._id);

    //Blacklisted
    if (userData.translator.blacklisted) return;
    if (await _.blacklisted(client, data.user)) return;

    //Not a verified translator
    let member = await _.promise(client.geolasHub.fetchMember(userData._id), true);
    if (((!member) || (!member.roles.has("432635413354643457"))) && (!await _.isDev(client, data.user))) return;

    //Invalid language
    const { validLanguages } = await models.data.findOne();
    const language = validLanguages.find(l => l.name === data.language);
    if (!language) return;

    //Send to module
    client.modules.webConnections.vtdModules[data.action](client, data);
};