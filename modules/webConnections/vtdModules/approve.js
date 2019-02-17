module.exports = async (client, { id, language, user }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get translation
    const translationData = await models.translations.findById(id);
    const proposedTranslation = translationData.translations.find(t => t.language === language).proposedTranslation;

    //Set translator
    proposedTranslation.translator = { id: user.id };

    //Save
    await _.save(client, translationData);
};