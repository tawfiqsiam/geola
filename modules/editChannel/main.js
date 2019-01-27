module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let channel = PARAMS.slice(1, 2).join(" ");
    let setting = PARAMS.slice(2, 3).join(" ").toLowerCase();
    let value = PARAMS.slice(3).join(" ");

    //No channel
    if (channel === "") return _.send({
        client,
        id: "editchannel no channel entered",
        channel: message.channel,
        message: "You must provide a channel!",
        emoji: "x"
    });

    //Get channel object
    channel = _.findChannel(message.guild, channel);

    //No channel, check for VC
    if ((!channel) || (channel.type === "voice")) {

        //VC name not in "quotes"
        if (message.content.replace(/[^"]/g, "").length !== 2) return _.send({
            client,
            id: "editchannel vc not in quotes",
            channel: message.channel,
            message: `I couldn't find that channel! If it's a voice channel, make sure the channel name is in "quotes"`,
            emoji: "x"
        });

        //Get channel object
        channel = _.findChannel(message.guild, message.content.split(`"`).slice(1, 2).join(`"`));

        //Adjust other params
        setting = message.content.split(`"`)[2].trim().split(" ").slice(0, 1).join(" ").toLowerCase();
        value = message.content.split(`"`)[2].trim().split(" ").slice(1).join(" ");
    }

    //No channel
    if (!channel) return _.send({
        client,
        id: "editchannel no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //No setting
    if (setting === "") return _.send({
        client,
        id: "editchannel no setting",
        channel: message.channel,
        message: "You must provide a setting to edit!",
        emoji: "x"
    });

    //Parse setting
    const settings = {
        name: ["name", "title"],
        move: ["move", "position", "place", "placement", "location"],
        topic: ["topic", "description", "desc", "text", "txt"],
        nsfw: ["nsfw", "porn", "porno", "pornography", "nudes"],
        bitrate: ["bitrate", "bit", "bits", "rate"],
        userLimit: ["userlimit", "user", "users", "limit"]
    };

    let settingValid = false;
    for (let s in settings) if (settings[s].includes(setting)) {
        setting = s;
        settingValid = true;
        break;
    }

    //Invalid setting
    if (!settingValid) return _.send({
        client,
        id: "editchannel invalid setting",
        channel: message.channel,
        message: "That setting doesn't exist!",
        emoji: "x"
    });

    //Process
    let data = await client.modules.editChannel[setting](client, message, value, channel);
    if (data instanceof Discord.Message) return;

    //Reason
    const reasons = [`I was told to do so by ${message.author.username}`, `As per request of ${message.author.username}`, `Some creature who calls itself ${message.author.username} told me to`, `${message.author.username} wanted me to`, `${message.author.username} asked me to and im basically a slave`];
    const reason = data.action === "setPosition" ? false : reasons[Math.floor(Math.random() * reasons.length)];

    //Edit
    let edited = await _.promise(channel[data.action](data.value, reason), true);

    if (edited) _.send({ //send
        client,
        id: data.id,
        channel: message.channel,
        message: data.message,
        emoji: "white_check_mark",
        vars: data.vars
    });
    else _.send({ //missing perms
        client,
        id: "editchannel missing perms",
        channel: message.channel,
        message: "I don't have enough permissions to do this! I need the Manage Channel or Administrator permission",
        emoji: "x"
    });
};