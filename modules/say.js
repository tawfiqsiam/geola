module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Say", 2000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1);
    let to = message.content.split(" ")[0].endsWith("to");
    let channel = message.channel;
    let msg = PARAMS.join(" ");
    if (to) {
        channel = _.findChannel(message.guild, PARAMS.slice(0, 1).join(" ").replace(/[<>#]/g, ""));
        msg = PARAMS.slice(1).join(" ");
    }

    //No channel
    if (!channel) return _.send({
        client,
        id: "say no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Parse to
    if (channel.id === message.channel.id) to = false;

    //Delete message
    if (!to) message.delete().catch(() => { });

    //Parse msg
    msg = msg
        .replace(/@everyone/ig, "everyone")
        .replace(/@here/ig, "here")
        .replace(/\/shrug/ig, "¯\\_(ツ)_/¯");

    //No msg
    if (msg === "") {
        if (to) _.send({
            client,
            id: "say no message",
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
        if (channelData.disabledCommands.includes("Say")) return _.send({
            client,
            id: "say command disabled",
            channel: message.channel,
            message: `The Say command is disabled in that channel!`,
            emoji: "x"
        });

        //Send messages
        if (!message.member.permissionsIn(channel).has("SEND_MESSAGES")) return _.send({
            client,
            id: "say no send perms",
            channel: message.channel,
            message: "You don't have permission to send messages in that channel!",
            emoji: "x"
        });
    }

    //Send message
    channel.send(msg);

    //Send
    if (to) _.send({
        client,
        id: "say spoken",
        channel: message.channel,
        message: "Sent message!",
        emoji: "speech_balloon"
    });

    //Log
    const logChannel = message.guild.channels.get(message.guild.data.logChannels && message.guild.data.logChannels.say);
    const logEmbed = new Discord.RichEmbed()
        .setTitle("I have spoken")
        .setDescription(msg)
        .setColor(_.colors.geola)
        .addField("User", `${message.author} (${message.author.id})`)
        .addField("Channel", `${channel} (${channel.id})`)
        .setTimestamp();

    if (logChannel) logChannel.send({ embed: logEmbed });

    //Post command
    await _.postCommand(client, message, "Say");
};