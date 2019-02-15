module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Get translation message
    const translationMessage = await client.translating.fetchMessage(message.author.data.verifiedTranslator.message);

    //Cancel
    if (message.content.toLowerCase().replace(/\s+/g, "") === "cancel") {

        translationMessage.reactions.get("⚠").remove(message.author);

        const sentMessage = await client.translating.send(":white_check_mark:  **|  Canceled!**");
        sentMessage.delete(5000);

        message.author.data.verifiedTranslator = undefined;
        _.save(client, message.author.data);

        return;
    }

    //Delete translation message
    translationMessage.delete();

    //Get translation details
    const EMBED = translationMessage.embeds[0];
    const DETAILS = EMBED.fields[2].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();

    //Get translation
    const translationData = await models.translations.findById(id);
    const translationLanguage = translationData.translations.find(t => t.language === language);
    const proposedTranslations = translationLanguage.proposedTranslations;
    const translation = proposedTranslations.find(t => t.message === translationMessage.id);

    //Set translator
    translation.translator = { id: message.author.id };
    translationLanguage.pendingProposals = translationLanguage.pendingProposals - 1;

    //Delete verified translator data
    message.author.data.verifiedTranslator = undefined;

    //Send confirmation
    const sentConfirmationMessage = await client.translating.send(":white_check_mark:  **|  Done!**");
    sentConfirmationMessage.delete(5000);

    //Embed
    const sendEmbed = new Discord.RichEmbed()
        .setAuthor(EMBED.author.name.replace(/New/, "New Report for"), EMBED.author.iconURL)
        .setDescription(`${EMBED.description}\nReported by ${message.author.tag} (${message.author.id})`)
        .setColor(EMBED.color)
        .addField(EMBED.fields[0].name, EMBED.fields[0].value)
        .addField(EMBED.fields[1].name, EMBED.fields[1].value)
        .addField("Report Reason", message.content)
        .addField(EMBED.fields[2].name, EMBED.fields[2].value)
        .setTimestamp();

    //Send
    const sentMessage = await client.devTranslating.send(sendEmbed);
    (async () => {
        await sentMessage.react("✴");
        await sentMessage.react("❌");
    })();
    translation.message = sentMessage.id;

    //Save
    _.save(client, translationData, message.author.data);
};