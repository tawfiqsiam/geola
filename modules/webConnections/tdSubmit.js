module.exports = async (client, data) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Over 2000 chars
    if (data.translation.length > 2000) return;

    //No translation
    if (data.translation.length === 0) return;

    //Get user data
    let userData = await models.users.findOne({ clientSecret: data.clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};
    data.user = client.users.get(userData._id) || await client.fetchUser(userData._id);

    //Blacklisted
    if (userData.translator.blacklisted) return;
    if (await _.blacklisted(client, data.user)) return;

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Tutorial not finished
    if (!userData.translator.finishedTutorial) return;

    //Invalid language
    const { validLanguages } = await models.data.findOne();
    const language = validLanguages.find(l => l.name === data.language);
    if (!language) return;

    //Get translation
    const translationData = await models.translations.findById(data.id);
    if (!translationData.translations.find(t => t.language === data.language)) translationData.translations.push({ language: data.language });
    const translation = translationData.translations.find(t => t.language === data.language);

    //Translation already proposed
    if (translation.toObject().proposedTranslation) return;

    //Set proposed translation
    translation.proposedTranslation = {
        user: {
            id: userData._id,
            translation: data.translation
        }
    };

    //Set next translation if needed
    userData.translator.nextTranslation = userData.translator.languages.filter(l => translationData.translations.find(t => (t.language === l) && ((t.translation) || (t.toObject().proposedTranslation)))).length < userData.translator.languages.length ?
        data.id :
        undefined;

    //Save
    await _.save(client, translationData, userData);
};