module.exports = async (client, reaction, user) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Delete message
    reaction.message.delete();

    //Get translation details
    const DETAILS = reaction.message.embeds[0].fields[2].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();

    //Remove translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);
    const proposedTranslations = translationLanguage.proposedTranslations;
    const translation = proposedTranslations.find(t => t.message === reaction.message.id);
    proposedTranslations.splice(proposedTranslations.indexOf(translation), 1);

    //Set translation
    translationLanguage.translation = translation.translator.translation || translation.user.translation;

    //Save
    _.save(client, translationData);
};