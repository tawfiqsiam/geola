module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let type = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let name = PARAMS.slice(2).join(" ");
    let cloneFrom = message.guild.channels.get(PARAMS[PARAMS.length - 1].replace(/[<>#]/g, ""));
    if (cloneFrom) name = PARAMS.slice(2, PARAMS.length - 1).join(" ");

    //Parse type
    if (["text", "txt", "textchannel", "txtchannel", "textchan", "txtchan"].includes(type)) type = "text";
    else if (["voice", "vc", "voicechannel", "voicechan"].includes(type)) type = "voice";
    else return _.send({ //invalid type
        client,
        id: "createchannel invalid type",
        channel: message.channel,
        message: "You must provide a valid channel type!",
        emoji: "x"
    });

    //No name
    if (name.length === 0) return _.send({
        client,
        id: "createchannel no name entered",
        channel: message.channel,
        message: "You must provide a channel name!",
        emoji: "x"
    });

    //Name over 100 chars
    if (name.length > 100) return _.send({
        client,
        id: "createchannel name too many chars",
        channel: message.channel,
        message: "The channel name can't be more than 100 characters!",
        emoji: "x"
    });

    //Create channel
    let created = await _.promise(
        cloneFrom ?
            cloneFrom.clone(name) :
            message.guild.createChannel(name, type),
        true
    );

    if (created) _.send({ //created
        client,
        id: "createchannel created",
        channel: message.channel,
        message: "{VAR1} has been created!",
        emoji: "white_check_mark",
        vars: [type === "text" ? created : created.name]
    });
    else _.send({ //missing perms
        client,
        id: "createchannel missing perms",
        channel: message.channel,
        message: "I don't have permissions to create channels! I need the Manage Channels or Administrator permission",
        emoji: "x"
    });
};