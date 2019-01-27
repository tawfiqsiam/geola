module.exports = async ({ client, id, channel, message, emoji, vars }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check params
    if (!client) throw new Error("Missing client!");
    if (!id) throw new Error("Missing ID!");
    if (!channel) throw new Error("Missing channel!");
    if (!message) throw new Error("Missing message!");
    if (!emoji) throw new Error("Missing emoji!");
    if (!vars) vars = [];

    //Add to DB
    await models.translations.findByIdAndUpdate(id, { english: message }, { upsert: true });

    //Get language
    let language = channel.data.language || channel.guild.data.language;

    //Get translation
    if (language !== "english") {
        let translation = await models.translations.findById(id, language);
        message = translation.get(language) || message;
    }

    //Add vars
    vars.forEach((v, i) => message = message.replace(new RegExp(`{VAR${i + 1}}`, "g"), v));

    //Send
    return await _.promise(channel.send(`:${emoji}:  **|  ${message}**`), true);
};