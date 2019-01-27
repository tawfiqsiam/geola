module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Mods", 3000)) return;

    //Get command params
    let server = message.content.split(" ").slice(1).join(" ");
    if (server === "") server = message.guild.id;

    //Get server
    server = client.guilds.get(server);

    //No server found
    if (!server) return _.send({
        client,
        id: "mods no server",
        channel: message.channel,
        message: "I couldn't find that server! Make sure that I am on that server",
        emoji: "x"
    });

    //Fetch members
    let members = (await server.fetchMembers()).members;

    //Filter + map members by tag
    let admins = members.filter(m => (
        (m.hasPermission("ADMINISTRATOR")) &&
        (m.id !== server.ownerID) &&
        (!m.user.bot)
    )).map(m => m.user.tag);

    let mods = members.filter(m => (
        (!m.hasPermission("ADMINISTRATOR")) &&
        (m.id !== server.ownerID) &&
        (!m.user.bot) &&
        ([
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "MANAGE_CHANNELS",
            "MANAGE_GUILD",
            "PRIORITY_SPEAKER",
            "MANAGE_MESSAGES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MOVE_MEMBERS",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS"
        ].some(p => m.permissions.has(p)))
    )).map(m => m.user.tag);

    admins = admins.length > 0 ? `- ${admins.join("\n- ")}` : "*None*";
    mods = mods.length > 0 ? `- ${mods.join("\n- ")}` : "*None*";

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${server.name}'s Mods`, server.iconURL)
        .setColor(await _.getColor(server.iconURL))
        .addField("Owner", server.owner.user.tag)
        .addField("Admins", admins)
        .addField("Mods", mods);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Mods");
};