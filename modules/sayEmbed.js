module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Say Embed", 2000)) return;

    //Get params
    const PARAMS = message.content.replace(/\n/g, " \n").split(" ").slice(1);
    let to = message.content.replace(/\n/g, " \n").split(" ")[0].endsWith("to");
    let channel = message.channel;
    let steps = PARAMS.join(" ");
    if (to) {
        channel = _.findChannel(message.guild, PARAMS.slice(0, 1).join(" ").replace(/[<>#]/g, ""));
        steps = PARAMS.slice(1).join(" ");
    }

    //No channel
    if (!channel) return _.send({
        client,
        id: "sayembed no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Parse to
    if (channel.id === message.channel.id) to = false;

    //Delete message
    if (!to) message.delete().catch(() => { });

    //Parse steps
    steps = steps
        .replace(/@everyone/ig, "everyone")
        .replace(/@here/ig, "here")
        .replace(/\/shrug/ig, "¯\\_(ツ)_/¯");

    //No message
    if (steps === "") {
        if (to) _.send({
            client,
            id: "sayembed no message",
            channel: message.channel,
            message: "What would you like me to say?",
            emoji: "x"
        });

        return;
    }

    //Check perms in target channel
    if (to) {

        //Command disabled
        const channelData = await models.channels.findById(channel.id);
        if (channelData.disabledCommands.includes("Say Embed")) return _.send({
            client,
            id: "sayembed command disabled",
            channel: message.channel,
            message: `The Say Embed command is disabled in that channel!`,
            emoji: "x"
        });

        //Send messages
        if (!message.member.permissionsIn(channel).has("SEND_MESSAGES")) return _.send({
            client,
            id: "sayembed no send perms",
            channel: message.channel,
            message: "You don't have permission to send messages in that channel!",
            emoji: "x"
        });
    }

    //Build embed
    const embed = new Discord.RichEmbed();
    const rawText = steps;
    steps = steps.split("\n").map(s => ({
        type: s.split(":").slice(0, 1).join(":").toLowerCase().replace(/\s+/g, ""),
        values: s.split(":").slice(1).join(":").split("|").map(v => v.trim())
    }));
    steps.forEach(s => {

        if (s.type === "title") embed.setTitle(...s.values); //title
        else if (s.type === "author") embed.setAuthor(...s.values); //author
        else if (["url", "link", "website", "site"].includes(s.type)) embed.setURL(...s.values); //url
        else if (["desc", "description"].includes(s.type)) embed.setDescription(...s.values); //description
        else if (["color", "colour"].includes(s.type)) embed.setColor(...s.values); //color
        else if (s.type === "field") embed.addField(...s.values); //field
        else if (["image", "img", "picture", "pic"].includes(s.type)) embed.setImage(...s.values); //image
        else if (["thumbnail", "tn"].includes(s.type)) embed.setThumbnail(...s.values); //thumbnail
        else if (s.type === "footer") embed.setFooter(...s.values); //footer
        else if (["time", "timestamp", "ts"].includes(s.type)) embed.setTimestamp(); //timestamp
    });

    //No steps
    if (
        !embed.title &&
        !embed.description &&
        !embed.url &&
        !embed.color &&
        !embed.author &&
        !embed.timestamp &&
        !embed.fields.length &&
        !embed.thumbnail &&
        !embed.image &&
        !embed.footer &&
        !embed.file &&
        !embed.fields.length
    ) embed.setDescription(rawText);

    //Send message
    let sent = await _.promise(channel.send(embed), true);

    //Formatting errors
    if (!sent) {
        if (to) _.send({
            client,
            id: "sayembed formatting errors",
            channel: message.channel,
            message: "The embed information isn't formatted properly!",
            emoji: "x"
        });

        return;
    }

    //Send
    if (to) _.send({
        client,
        id: "sayembed spoken",
        channel: message.channel,
        message: "Sent embed!",
        emoji: "speech_balloon"
    });

    //Log
    const logChannel = message.guild.channels.get(message.guild.data.logChannels && message.guild.data.logChannels.say);
    const logEmbed = new Discord.RichEmbed()
        .setTitle("I have spoken with an embed")
        .setDescription(rawText)
        .setColor(_.colors.geola)
        .addField("User", `${message.author} (${message.author.id})`)
        .addField("Channel", `${channel} (${channel.id})`)
        .setTimestamp();

    if (logChannel) logChannel.send({ embed: logEmbed });

    //Post command
    await _.postCommand(client, message, "Say Embed");
};