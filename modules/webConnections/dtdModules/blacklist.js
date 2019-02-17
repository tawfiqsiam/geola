module.exports = async (client, { id, language, text: reason, user }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //Get translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);

    //Notify submitter
    const submitterData = await models.users.findById(translationLanguage.proposedTranslation.user.id);
    if (!submitterData.translator.notifications) submitterData.translator.notifications = [];
    submitterData.translator.notifications.push({
        text: "Blacklisted",
        info: `You have been blacklisted by ${user.username}#${user.discriminator} due to your ${validLanguages.find(l => l.name === language).displayName} translation for "${id}" with the following reason: ${reason}`,
        timestamp: Date.now()
    });

    //Blacklist
    submitterData.translator.blacklisted = true;

    //Remove translation
    translationLanguage.proposedTranslation = undefined;

    //Save
    await _.save(client, translationData, submitterData);
};