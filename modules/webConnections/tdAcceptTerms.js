module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};

    //Blacklisted
    if (userData.translator.blacklisted) return;
    if (await _.blacklisted(client, (client.users.get(userData._id) || await client.fetchUser(userData._id)))) return;

    //Terms already accepted
    if (userData.translator.acceptedTerms) return;

    //Set accepted terms
    userData.translator.acceptedTerms = true;

    //Save
    await _.save(client, userData);
};