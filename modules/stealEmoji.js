module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Get params
    const PARAMS = message.content.split(" ");
    let emoji = PARAMS.slice(1, 2).join(" ");
    let server = PARAMS.slice(2).join(" ");

    //No emoji entered
    if (emoji === "") return _.send({
        client,
        id: "stealemoji no emoji entered",
        channel: message.channel,
        message: "You must provide an emoji!",
        emoji: "x"
    });

    //Get emoji object
    emoji = _.findEmoji(message.guild, emoji);

    //No emoji
    if (!emoji) return _.send({
        client,
        id: "stealemoji no emoji",
        channel: message.channel,
        message: "I couldn't find that emoji!",
        emoji: "x"
    });

    //No server entered
    if (server === "") return _.send({
        client,
        id: "stealemoji no server entered",
        channel: message.channel,
        message: "You must provide a server!",
        emoji: "x"
    });

    //Get server object
    server = client.guilds.get(server);

    //Get member object
    let member;
    if (server) member = await _.promise(server.fetchMember(message.author.id), true);

    //No server or member
    if ((!server) || (!member)) return _.send({
        client,
        id: "stealemoji no server or member",
        channel: message.channel,
        message: "I couldn't find that server! Make sure that both of us are on it, and that you are using a server ID",
        emoji: "x"
    });

    //Server is the same
    if (server.id === message.guild.id) return _.send({
        client,
        id: "stealemoji server is the same",
        channel: message.channel,
        message: "What's the point of stealing from yourself? {VAR1}",
        emoji: "x",
        vars: [client.emojis.get("503275261987520522")] //:waitwtf:
    });

    //No perms
    if (!member.hasPermission("MANAGE_EMOJIS")) return _.send({
        client,
        id: "stealemoji no perms",
        channel: message.channel,
        message: "You don't have permission to create emojis on {VAR1}!",
        emoji: "x",
        vars: [server.name]
    });

    //Create emoji
    const created = await _.promise(server.createEmoji(emoji.url, emoji.name), true);

    //Created
    if (created) _.send({
        client,
        id: "stealemoji stole",
        channel: message.channel,
        message: "Hah! That emoji is now yours!",
        emoji: "smiling_imp"
    });
    else _.send({ //missing perms
        client,
        id: "stealemoji missing perms",
        channel: message.channel,
        message: "I don't have permissions to create emojis! I need the Manage Emojis or Administrator permission on {VAR1}",
        emoji: "x",
        vars: [server.name]
    });
};