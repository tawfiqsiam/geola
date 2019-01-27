module.exports = async (client, user) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Fetch member from Geolas Hub
    let member = await _.promise(client.geolasHub.fetchMember(user.id), true);

    //Not on Geolas Hub
    if (!member) return false;

    //Doesnt have dev role
    if (!member.roles.has(client.developerRole.id)) return false;

    return true;
};