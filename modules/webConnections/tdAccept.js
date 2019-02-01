module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return;

    //Blacklisted
    if (userData.translator.blacklisted) return;

    //Terms already accepted
    if (userData.translator.acceptedTerms) return;

    //Set accepted terms
    userData.translator.acceptedTerms = true;

    //Save
    await _.save(client, userData);
};