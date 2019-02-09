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

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Tutorial already finished
    if (userData.translator.finishedTutorial) return;

    //Set finished tutorial
    userData.translator.finishedTutorial = true;

    //Save
    await _.save(client, userData);
};