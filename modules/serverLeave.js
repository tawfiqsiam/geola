module.exports = async (client, guild) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Guild unavailable
    if (!guild.available) return;

    //Get data
    let data = await models.data.findOne(null, null, { lean: true });

    //Server Blacklisted
    if (data.blacklistedServers.includes(guild.id)) return;

    //Log
    let logEmbed = new Discord.RichEmbed()
        .setAuthor(`${guild.name}, owned by ${guild.owner.user.tag}`, client.user.displayAvatarURL)
        .setColor(_.colors.bad)
        .setFooter(guild.id)
        .setTimestamp();

    client.joinLeave(logEmbed);

    //Stats
    await _.stats(client, "Servers Left");
};