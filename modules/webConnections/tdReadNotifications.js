module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret: clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};

    //Blacklisted
    if (userData.translator.blacklisted) return;

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Set last notifications check
    userData.translator.lastNotificationsCheck = Date.now();

    //Save
    await _.save(client, userData);
};