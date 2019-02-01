module.exports = async (client, data) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret: data.clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};

    //Blacklisted
    if (userData.translator.blacklisted) return;

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Set languages
    const { validLanguages } = await models.data.findOne();
    userData.translator.languages = data.languages.filter(l => validLanguages.find(ll => ll.name === l));

    //Save
    await _.save(client, userData);
};