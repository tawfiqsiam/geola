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

    //Blacklisted
    if (userData.translator.blacklisted) return;

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Invalid language
    const { validLanguages } = await models.data.findOne();
    if (!validLanguages.find(l => l.name === data.language)) return;

    //Get translation
    const translations = await models.translations.findById(data.id);
    if (!translations.translations.find(t => t.language === data.language)) translations.translations.push({ language: data.language, proposedTranslations: [] });
    const translation = translations.translations.find(t => t.language === data.language);

    //Add to proposed translations
    translation.proposedTranslations.push({
        user: {
            id: userData._id,
            translation: data.translation
        }
    });

    //Save
    await _.save(client, translations);
};