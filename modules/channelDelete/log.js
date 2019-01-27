module.exports = async (client, channel) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await channel.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = ["This is devastating", "Can't believe we've lost another one", "RIP"];

    return new Discord.RichEmbed()
        .setAuthor("Channel Deleted", channel.guild.iconURL)
        .setDescription(`${channel.type === "text" ? "#" : ""}${channel.name}`)
        .setColor(_.colors.bad)
        .addField("Channel ID", channel.id)
        .addField("Channel Deleter", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};