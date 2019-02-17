module.exports = async (client, { id, language, text: editedTranslation }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //Get translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);

    //Get translator
    const translator = client.users.get(translationLanguage.proposedTranslation.translator.id) || await client.fetchUser(translationLanguage.proposedTranslation.translator.id);

    //Notify submitter
    const submitterData = await models.users.findById(translationLanguage.proposedTranslation.user.id);
    if (!submitterData.translator.notifications) submitterData.translator.notifications = [];
    submitterData.translator.notifications.push({
        text: "Translation Approved",
        info: `Your ${validLanguages.find(l => l.name === language).displayName} translation for "${id}" has been approved by ${translator.username}#${translator.discriminator}`,
        timestamp: Date.now()
    });

    //Add to stats
    submitterData.stats.translations = submitterData.stats.translations + 1 || 1;

    //Add badge
    const submitterUser = client.users.get(translationLanguage.proposedTranslation.user.id) || await client.fetchUser(translationLanguage.proposedTranslation.user.id);
    submitterUser.data = submitterData;
    await _.badge({
        client,
        action: "add",
        user: submitterUser,
        name: "Translator"
    });

    //Set translation
    translationLanguage.translation = editedTranslation;

    //Remove translation
    translationLanguage.proposedTranslation = undefined;

    //Save
    await _.save(client, translationData, submitterData);
};