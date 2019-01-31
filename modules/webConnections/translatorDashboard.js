module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return { error: "Invalid client secret" };

    //Blacklisted
    if (userData.translator.blacklisted) return { error: "Blacklisted" };

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return { error: "Terms not accepted" };

    //

    //Return
    return userData;
};