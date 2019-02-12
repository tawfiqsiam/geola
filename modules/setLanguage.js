module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let language = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let channel = PARAMS.slice(2).join(" ");

    //Get valid languages
    const { validLanguages } = await models.data.findOne();
    validLanguages.push({
        name: "english",
        displayName: "English",
        inputs: ["", "english", "en"],
        public: true
    });

    //Parse language
    language = validLanguages.find(l => l.inputs.includes(language));

    //No language
    if (!language) return _.send({
        client,
        id: "setlanguage invalid language",
        channel: message.channel,
        message: "We currently don't support that language! If you would like to become a translator, please DM `{VAR1}` (my creator)",
        emoji: "x",
        vars: ["APixel Visuals#2820"]
    });

    //Not public
    if (!language.public) return _.send({
        client,
        id: "setlanguage language not public",
        channel: message.channel,
        message: "This language is still being translated! If you are fluent in both English and {VAR1}, feel free to contribute to the translations at http://geolabot.com/translate",
        emoji: "x",
        vars: [language.displayName]
    });

    //Parse channel
    if (channel === "") channel = null;
    else {
        channel = _.findChannel(message.guild, channel);
        if (!channel) return _.send({
            client,
            id: "setlanguage no channel",
            channel: message.channel,
            message: "I couldn't find that channel!",
            emoji: "x"
        });
    }

    //Get data
    const data = channel ?
        (channel.id === message.channel.id ? message.channel.data : await models.channels.findById(channel.id)) :
        message.guild.data;

    //Language is already set
    if (data.language === language.name) return _.send({
        client,
        id: "setlanguage already set",
        channel: message.channel,
        message: "The language is already set as {VAR1}!",
        emoji: "x",
        vars: [language.displayName]
    });

    //Set language
    data.language = language.name;
    if ((channel) && (data.language === "english")) data.language = undefined;

    //Save doc
    if ((!channel) || (channel.id !== message.channel.id)) await _.save(client, data);

    //Send
    _.send({
        client,
        id: "setlanguage set",
        channel: message.channel,
        message: "The language has been set to {VAR1}!",
        emoji: "white_check_mark",
        vars: [language.displayName]
    });
};