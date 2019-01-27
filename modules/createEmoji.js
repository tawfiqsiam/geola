module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let name = PARAMS.slice(1, 2).join(" ").replace(/[^A-Za-z0-9_]/g, "");
    let source = PARAMS.slice(2).join(" ");
    if (source === "") source = message.attachments.array()[0] ? message.attachments.array()[0].url : null;
    if ((source) && (!source.startsWith("http://")) && (!source.startsWith("https://"))) source = `http://${source}`;

    //No name
    if (name.length === 0) return _.send({
        client,
        id: "createemoji no name entered",
        channel: message.channel,
        message: "You must provide an emoji name!",
        emoji: "x"
    });

    //Name over 32 chars
    if (name.length > 32) return _.send({
        client,
        id: "createemoji name too many chars",
        channel: message.channel,
        message: "The emoji name can't be more than 32 characters!",
        emoji: "x"
    });

    //No source
    if (!source) return _.send({
        client,
        id: "createemoji no source",
        channel: message.channel,
        message: "You must provide an image source!",
        emoji: "x"
    });

    //Create emoji
    let created = await _.promise(message.guild.createEmoji(source, name));

    //File too large
    if (created.code === 50035) return _.send({
        client,
        id: "createemoji file too large",
        channel: message.channel,
        message: "The source can't be over 256KB!",
        emoji: "x"
    });

    //Missing perms
    if (created.code === 50013) return _.send({
        client,
        id: "createemoji missing perms",
        channel: message.channel,
        message: "I don't have permissions to create emojis! I need the Manage Emojis or Administrator permission",
        emoji: "x"
    });

    //Invalid source
    if (created instanceof Error) return _.send({
        client,
        id: "createemoji invalid source",
        channel: message.channel,
        message: "The source you provided isn't a valid image!",
        emoji: "x"
    });

    //Send
    _.send({
        client,
        id: "createemoji created",
        channel: message.channel,
        message: "{VAR1} has been created!",
        emoji: "white_check_mark",
        vars: [created.name]
    });
};