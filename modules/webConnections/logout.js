module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return;

    //Remove data
    userData.clientSecret = undefined;
    userData.accessToken = undefined;
    userData.refreshToken = undefined;

    //Save
    await _.save(client, userData);

    //Return
    return true;
};