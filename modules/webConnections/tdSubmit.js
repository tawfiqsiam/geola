module.exports = async (client, data) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Over 2000 chars
    if (data.translation.length > 2000) return;

    //No translation
    if (data.translation.length === 0) return;

    //Get user data
    let userData = await models.users.findOne({ clientSecret: data.clientSecret });
    if (!userData) return;
    if (!userData.translator) userData.translator = {};
    const user = client.users.get(userData._id) || await client.fetchUser(userData._id);

    //Blacklisted
    if (userData.translator.blacklisted) return;
    if (await _.blacklisted(client, (client.users.get(userData._id) || await client.fetchUser(userData._id)))) return;

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return;

    //Invalid language
    const { validLanguages } = await models.data.findOne();
    const language = validLanguages.find(l => l.name === data.language);
    if (!language) return;

    //Get translation
    const translationData = await models.translations.findById(data.id);
    if (!translationData.translations.find(t => t.language === data.language)) translationData.translations.push({ language: data.language, proposedTranslations: [] });
    const translation = translationData.translations.find(t => t.language === data.language);

    //Embed
    const embed = new Discord.RichEmbed()
        .setAuthor(`New ${language.displayName} Translation`, user.displayAvatarURL || `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
        .setDescription(`By ${user.username}#${user.discriminator} (${user.id})`)
        .setColor(_.colors.geola)
        .addField("English", translationData.english)
        .addField("Translation", data.translation)
        .addField("Details", `Translation ID: ${translationData._id}\nLanguage: ${language.name}`)
        .setTimestamp();

    //Send
    const message = await client.translating.send(embed);
    (async () => {
        await message.react("✅");
        await message.react("✏");
        await message.react("❌");
        await message.react("⚠");
    })();

    //Add to proposed translations
    translation.proposedTranslations.push({
        message: message.id,
        user: {
            id: userData._id,
            translation: data.translation
        }
    });

    //Set next translation if needed
    userData.translator.nextTranslation = userData.translator.languages.filter(l => translationData.translations.find(t => (t.language === l) && ((t.translation) || (t.proposedTranslations.length)))).length < userData.translator.languages.length ?
        data.id :
        undefined;

    //Save
    await _.save(client, translationData, userData);
};