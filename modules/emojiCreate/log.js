module.exports = async (client, emoji) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await emoji.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = [""];

    return new Discord.RichEmbed()
        .setAuthor("New Emoji", emoji.guild.iconURL)
        .setDescription(emoji.name)
        .setColor(_.colors.good)
        .addField("Emoji ID", emoji.id)
        .addField("Emoji URL", emoji.url)
        .addField("Emoji Creator", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};