module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "React", 3000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1);
    let emoji, channel, target;
    PARAMS.forEach(p => {

        p = p.trim();

        if (p.includes(":")) emoji = p.replace(/[<>]/g, "").split(":")[2]; //custom emoji
        else if (p.includes("#")) channel = p.replace(/[<>#]/g, ""); //channel
        else if (p.replace(/[0-9]/g, "") === p) emoji = p; //emoji
        else target = p; //message
    });

    //No Emoji
    if (!emoji) return _.send({
        client,
        id: "react no emoji",
        channel: message.channel,
        message: "That isn't a valid emoji!",
        emoji: "x"
    });

    //Parse channel
    channel = channel || message.channel.id;
    channel = message.guild.channels.get(channel);
    if (!channel) return _.send({
        client,
        id: "react no channel",
        channel: message.channel,
        message: "That channel doesn't exist!",
        emoji: "x"
    });

    //Parse target
    target = target || message.id;
    target = await _.promise(channel.fetchMessage(target), true);
    if (!target) return _.send({
        client,
        id: "react no message",
        channel: message.channel,
        message: "That message doesn't exist in that channel!",
        emoji: "x"
    });

    //React command disabled
    if (target.channel.id !== message.channel.id) {

        let channelData = await models.channels.findById(target.channel.id, "disabledCommands");

        if (channelData.disabledCommands.includes("React")) return _.send({
            client,
            id: "react command disabled",
            channel: message.channel,
            message: "The React command is disabled in that channel!",
            emoji: "x"
        });
    }

    //No react perms
    if (!target.channel.permissionsFor(message.member).has("ADD_REACTIONS")) return _.send({
        client,
        id: "react no perms",
        channel: message.channel,
        message: "You don't have permission to add reactions!",
        emoji: "x"
    });

    //React
    let reacted = await _.promise(target.react(emoji));

    //Invalid emoji
    if (reacted.code === 10014) return _.send({
        client,
        id: "react invalid emoji",
        channel: message.channel,
        message: "That isn't a valid emoji! Make sure that you are only using one emoji",
        emoji: "x"
    });

    //Missing perms
    if (reacted.code === 50013) return _.send({
        client,
        id: "react missing perms",
        channel: message.channel,
        message: "I don't have permission to add reactions! You can fix this by giving me the Add Reactions or Administrator permission",
        emoji: "x"
    });

    //Send
    _.send({
        client,
        id: "react reacted",
        channel: message.channel,
        message: "Reacted!",
        emoji: "white_check_mark"
    });

    //Post command
    await _.postCommand(client, message, "React");
};