module.exports = async (client, guild) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Fetch ALL the bitches!
    await guild.fetchMembers();

    //Guild unavailable
    if (
        (!guild.available) ||
        (guild.joinedTimestamp < Date.now() - 600000)
    ) return;

    //Get data
    let data = await models.data.findOne(null, null, { lean: true });

    //Server Blacklisted
    if (data.blacklistedServers.includes(guild.id)) return guild.leave();

    //Bot farm
    if (
        (guild.members.filter(m => m.user.bot).size >= 30) &&
        (!data.botFarmWhitelist.includes(guild.id))
    ) {

        await guild.owner.user.send(":x:  **|  I have left your server due to it being detected as a Bot Farm. A Bot Farm is a server that is meant for spamming bots. If you think that this is a mistake, please let my Support Team know in the `#support` channel of my Hub (support server) at https://discord.gg/eCDafVC**");

        return guild.leave();
    }

    //Clone detection
    if ((guild.name.toLowerCase().replace(/\s+/g, "").includes("geola")) && (guild.id !== client.geolasHub.id)) {

        await guild.owner.user.send(":x:  **|  I have left your server due to it being detected as an unauthorized clone of my official server. If you think that this is a mistake, please let my Support Team know in the `#support` channel of my Hub (support server) at https://discord.gg/eCDafVC**");

        return guild.leave();
    }

    //Create docs
    models.servers.create({ _id: guild.id }).catch(() => { }); //server
    models.channels.insertMany(guild.channels.map(c => ({ _id: c.id })), { ordered: false }).catch(() => { }); //channels
    models.members.insertMany(guild.members.map(m => ({ _id: { server: guild.id, user: m.id }, bot: m.user.bot })), { ordered: false }).catch(() => { }); //members
    models.users.insertMany(guild.members.map(m => ({ _id: m.id, bot: m.user.bot })), { ordered: false }).catch(() => { }); //users

    //Thank you message
    let embed = new Discord.RichEmbed()
        .setAuthor("Hey! Thanks for adding me!", client.user.displayAvatarURL, "http://geolabot.com")
        .setDescription(`You need to set me up for this server! To do so, simply have a moderator visit [geolabot.com/dashboard](http://geolabot.com/dashboard) to access the Dashboard. I recommend starting in the "Main" section. If you have any questions, join my support server at https://discord.gg/eCDafVC and ask away in the \`#support\` channel!`)
        .setColor(_.colors.geola);

    let embedChannel = guild.channels.filter(c => c.type === "text").array()[0];
    if (embedChannel) embedChannel.send(embed);

    //Log
    let logEmbed = new Discord.RichEmbed()
        .setAuthor(`${guild.name}, owned by ${guild.owner.user.tag}`, client.user.displayAvatarURL)
        .setColor(_.colors.good)
        .setFooter(guild.id)
        .setTimestamp();

    client.joinLeave(logEmbed);

    //Stats
    await _.stats(client, "Servers Joined");
};