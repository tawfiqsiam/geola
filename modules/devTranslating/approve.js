module.exports = async (client, reaction, user) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Delete message
    reaction.message.delete();

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //Get translation details
    const EMBED = reaction.message.embeds[0];
    const DETAILS = EMBED.fields[reaction.message.embeds[0].fields.length - 1].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();
    const submitter = EMBED.description.split("\n")[0].split(" ").reverse()[0].replace(/[()]/g, "");

    //Remove translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);
    const proposedTranslations = translationLanguage.proposedTranslations;
    const translation = proposedTranslations.find(t => t.message === reaction.message.id);
    proposedTranslations.splice(proposedTranslations.indexOf(translation), 1);

    //Set translation
    translationLanguage.translation = translation.translator.translation || translation.user.translation;

    //Notify submitter
    const submitterData = await models.users.findById(submitter);
    if (!submitterData.translator.notifications) submitterData.translator.notifications = [];
    submitterData.translator.notifications.push({
        text: "Translation Approved",
        info: `Your ${validLanguages.find(l => l.name === language).displayName} translation for "${id}" has been approved by ${user.tag}`,
        timestamp: Date.now()
    });

    //Save
    _.save(client, translationData);
};