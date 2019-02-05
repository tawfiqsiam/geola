module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get translation message
    const translationMessage = await client.devTranslating.fetchMessage(message.author.data.devTranslator.message);

    //Cancel
    if (message.content.toLowerCase().replace(/\s+/g, "") === "cancel") {

        translationMessage.reactions.get("✏").remove(message.author);

        const sentMessage = await client.devTranslating.send(":white_check_mark:  **|  Canceled!**");
        sentMessage.delete(5000);

        message.author.data.devTranslator = undefined;
        _.save(client, message.author.data);

        return;
    }

    //Delete translation message
    translationMessage.delete();

    //Get translation details
    const EMBED = translationMessage.embeds[0];
    const DETAILS = EMBED.fields[EMBED.fields.length - 1].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();

    //Remove translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);
    const proposedTranslations = translationLanguage.proposedTranslations;
    const translation = proposedTranslations.find(t => t.message === translationMessage.id);
    proposedTranslations.splice(proposedTranslations.indexOf(translation), 1);

    //Set translation
    translationLanguage.translation = message.content;

    //Set dev translator data
    message.author.data.devTranslator = undefined;

    //Send confirmation
    const sentConfirmationMessage = await client.devTranslating.send(":white_check_mark:  **|  Done!**");
    sentConfirmationMessage.delete(5000);

    //Save
    _.save(client, translationData, message.author.data);
};