module.exports = async (client, message) => {

    //Pre Module
    /* const { models, _ } = client.modules.misc.preModule(client); */

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Languages disabled
    message.channel.send(":information_source:  **|  Unfortunately, since the entire bot's code has recently been rewritten, all translations have been deleted. However, we are setting up a new system for anyone to contribute to translations. If you would like to stay updated, watch out for updates in the `#dev-updates` channel of my Hub (support server) at <https://discord.gg/eCDafVC>**");

    /* //Get command params
    const PARAMS = message.content.split(" ");
    let language = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let channel = PARAMS.slice(2).join(" ");

    //Parse language
    const languages = {
        "english": {
            name: "English",
            inputs: ["english", "en", ""]
        },
        "german": {
            name: "Deutsch",
            inputs: ["german", "de", "deutsch"]
        },
        "dutch": {
            name: "Nederlands",
            inputs: ["dutch", "ne", "nederlands"]
        },
        "spanish": {
            name: "Español",
            inputs: ["spanish", "es", "espanol", "español"]
        },
        "french": {
            name: "Français",
            inputs: ["french", "fr", "francais", "français"]
        },
        "portuguese": {
            name: "Português",
            inputs: ["portuguese", "pt", "portugues", "português"]
        }
    };

    let languageValid = false;
    for (let l in languages) if (languages[l].inputs.includes(language)) {
        language = l;
        languageValid = true;
        break;
    }

    //Invalid language
    if (!languageValid) return _.send({
        client,
        id: "setlanguage invalid language",
        channel: message.channel,
        message: "We currently don't support that language! If you would like to become a translator, please DM {VAR1} (my creator)",
        emoji: "x",
        vars: ["APixel Visuals#2820"]
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
    const data = channel ? await models.channels.findById(channel.id) : message.guild.data;

    //Language is already set
    if (data.language === language) return _.send({
        client,
        id: "setlanguage already set",
        channel: message.channel,
        message: "The language is already set as {VAR1}!",
        emoji: "x",
        vars: [languages[language].name]
    });

    //Set language
    data.language = language;
    if ((channel) && (data.language === "english")) data.language = undefined;

    //Save doc
    await _.save(client, data);

    //Send
    _.send({
        client,
        id: "setlanguage set",
        channel: message.channel,
        message: "The language has been set to {VAR1}!",
        emoji: "white_check_mark",
        vars: [languages[language].name]
    }); */
};