module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Cancel
    if (message.content.toLowerCase().replace(/\s+/g, "") === "cancel") {

        message.reactions.get("⚠").remove(message.author);

        const sentMessage = await client.translating.send(":white_check_mark:  **|  Canceled!**");
        sentMessage.delete(5000);

        message.author.data.verifiedTranslator = undefined;
        _.save(client, message.author.data);

        return;
    }

    //Get translation message
    const translationMessage = await client.translating.fetchMessage(message.author.data.verifiedTranslator.message);

    //Delete messages
    message.delete();
    translationMessage.delete();

    //Get translation details
    const EMBED = translationMessage.embeds[0];
    const DETAILS = EMBED.fields[2].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();

    //Remove translation
    const translationData = await models.translations.findById(id);
    const proposedTranslations = translationData.translations.find(t => t.language === language).proposedTranslations;
    const translation = proposedTranslations.find(t => t.message === translationMessage.id);
    proposedTranslations.splice(translation, 1);

    //Delete verified translator data
    message.author.data.verifiedTranslator = undefined;

    //Send confirmation
    const sentConfirmationMessage = await client.translating.send(":white_check_mark:  **|  Done!**");
    sentConfirmationMessage.delete(5000);

    //Embed
    const sendEmbed = new Discord.RichEmbed()
        .setAuthor(EMBED.author.name, EMBED.author.iconURL)
        .setDescription(EMBED.description)
        .setColor(EMBED.color)
        .addField(EMBED.fields[0].name, EMBED.fields[0].value)
        .addField(EMBED.fields[1].name, EMBED.fields[1].value)
        .addField("Report Reason", message.content)
        .addField(EMBED.fields[2].name, EMBED.fields[2].value)
        .setTimestamp();

    //Send
    const sentMessage = await client.devTranslating.send(sendEmbed);
    (async () => {
        await sentMessage.react("✅");
        await sentMessage.react("✏");
        await sentMessage.react("❌");
    })();

    //Save
    _.save(client, translationData, message.author.data);
};