module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user data
    const userData = await models.users.findOne({ clientSecret });
    if (!userData) return;

    //Get user
    const user = client.users.get(userData._id) || await client.fetchUser(userData._id);

    //Return
    return {
        avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${userData._id}/${user.avatar}` : null
    };
};