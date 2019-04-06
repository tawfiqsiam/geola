module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Server", 3000)) return;

    //Get server from param
    let server = message.content.split(" ").slice(1).join(" ");
    if (server === "") server = message.guild.id;

    //Get server object
    server = client.guilds.get(server);

    //No server found
    if (!server) return _.send({
        client,
        id: "server no server",
        channel: message.channel,
        message: "I couldn't find the server! Make sure that I am on that server",
        emoji: "x"
    });

    //Check for just ID
    if (message.content.toLowerCase().split(" ")[0].endsWith("serverid")) return message.channel.send(server.id);

    //Get server data
    let serverData = server.id === message.guild.id ?
        message.guild.data :
        await models.servers.findById(server.id);

    //Verif level
    const verifLevel = ["None", "Low", "Medium", "(╯°□°）╯︵ ┻━┻", "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"][server.verificationLevel];

    //Region
    const region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "hongkong": "Hong Kong",
        "russia": "Russia",
        "singapore": "Singapore",
        "sydney": "Sydney",
        "us-central": "US Central",
        "us-east": "US East",
        "us-south": "US South",
        "us-west": "US West",
        "eu-west": "Western Europe",
        "southafrica": "South Africa",
        "japan": "Japan",
        "vip-brazil": "Brazil (VIP)",
        "vip-eu-central": "Central Europe (VIP)",
        "vip-hongkong": "Hong Kong (VIP)",
        "vip-russia": "Russia (VIP)",
        "vip-singapore": "Singapore (VIP)",
        "vip-sydney": "Sydney (VIP)",
        "vip-us-central": "US Central (VIP)",
        "vip-us-east": "US East (VIP)",
        "vip-us-south": "US South (VIP)",
        "vip-us-west": "US West (VIP)",
        "vip-eu-west": "Western Europe (VIP)",
        "vip-southafrica": "South Africa (VIP)",
        "vip-japan": "Japan (VIP)"
    }[server.region];

    //Fetch owner into cache
    await server.fetchMember(server.ownerID);

    //Channels
    const textChannels = server.channels.filter(c => c.type === "text").size;
    const voiceChannels = server.channels.filter(c => c.type === "voice").size;
    const categoryChannels = server.channels.filter(c => c.type === "category").size;
    const totalChannels = server.channels.size;

    //Roles
    let levelRewardRoles = serverData.levelRewards ?
        serverData.levelRewards.filter(lr => lr.addRoles).map(lr => lr.addRoles) :
        [];
    levelRewardRoles = server.roles.filter(r => levelRewardRoles.some(lr => lr.includes(r.id)));

    let adminRoles = server.roles.filter(r => r.hasPermission("ADMINISTRATOR"));

    let modRoles = server.roles.filter(r => (
        (!r.hasPermission("ADMINISTRATOR")) &&
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
        ].some(p => new Discord.Permissions(r.permissions).has(p)))
    ));

    let otherRoles = server.roles.filter(r => (
        (!adminRoles.has(r.id)) &&
        (!modRoles.has(r.id)) &&
        (!levelRewardRoles.has(r.id))
    )).size;

    levelRewardRoles = levelRewardRoles.size;
    adminRoles = adminRoles.size;
    modRoles = modRoles.size;
    let totalRoles = server.roles.size;

    //Emojis
    const normieEmojis = server.emojis.filter(e => !e.animated).size;
    const animatedEmojis = server.emojis.filter(e => e.animated).size;
    const totalEmojis = server.emojis.size;

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(server.name, server.iconURL, server.iconURL)
        .setDescription(`Owned by **${server.owner.user.tag}** (${server.ownerID})`)
        .setColor(await _.getColor(server.iconURL))
        .addField("Region", region, true)
        .addField("Members", server.memberCount, true)
        .addField("Verification Level", verifLevel, true)
        .addField("Channels", `**${textChannels}** Text Channels\n**${voiceChannels}** Voice Channels\n**${categoryChannels}** Categories\n**${totalChannels} Total Channels**`, true)
        .addField("Emojis", `**${normieEmojis}** Helpless Normie Emojis\n**${animatedEmojis}** Fire AF Animated Emojis\n**${totalEmojis} Total Emojis**`, true)
        .addField("Roles", `**${adminRoles}** Administrative Roles\n**${modRoles}** Moderative Roles\n**${levelRewardRoles}** Level Reward Roles\n**${otherRoles}** Lame Worthless Roles\n**${totalRoles} Total Roles**`, true)
        .setFooter(`Server ID: ${server.id}`);

    if (serverData.get("verified")) {
        embed
            .addBlankField(true)
            .addField("Verified", "It's pretty legit", true)
            .addBlankField(true);
    }

    if (server.iconURL) embed.addField("Icon Link", `[discordapp.com...](${server.iconURL})`);

    embed
        .addField("Created On", _.englishDate(server.createdAt))
        .addField("I Joined On", _.englishDate(server.joinedAt));

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Server");
};