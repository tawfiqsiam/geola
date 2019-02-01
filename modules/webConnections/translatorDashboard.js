module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return { error: "Invalid client secret" };
    if (!userData.translator) userData.translator = {};

    //Blacklisted
    if (userData.translator.blacklisted) return { error: "Blacklisted" };

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return { error: "Terms not accepted" };

    //No languages
    if ((!userData.translator.languages) || (!userData.translator.languages.length)) {
        const { validLanguages } = await models.data.findOne();
        return { error: "No languages", validLanguages };
    }

    //Get translating
    let translating = await models.translations.findById(userData.translator.translating, `english ${userData.translator.languages.join(" ")}`, { lean: true });

    //Return
    return translating;
};