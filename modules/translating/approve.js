module.exports = async (client, reaction, user) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Delete message
    reaction.message.delete();

    //Get translation details
    const EMBED = reaction.message.embeds[0];
    const DETAILS = EMBED.fields[2].value.split("\n");
    const id = DETAILS[0].split(":")[1].trim();
    const language = DETAILS[1].split(":")[1].trim();

    //Get translation
    const translationData = await models.translations.findById(id);
    const translation = translationData.translations.find(t => t.language === language).proposedTranslations.find(t => t.message === reaction.message.id);

    //Set translator
    translation.translator = { id: user.id };

    //Embed
    const sendEmbed = new Discord.RichEmbed(EMBED).setTimestamp();

    //Send
    const message = await client.devTranslating.send(sendEmbed);
    (async () => {
        await message.react("✅");
        await message.react("✏");
        await message.react("❌");
        await message.react("✴");
    })();
    translation.message = message.id;

    //Save
    _.save(client, translationData);
};