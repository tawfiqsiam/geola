module.exports = async (client, channel) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await channel.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = ["Another meme area?", "I wonder if I can self-promo here..."];

    return new Discord.RichEmbed()
        .setAuthor("New Channel", channel.guild.iconURL)
        .setDescription(`${channel.type === "text" ? `${channel} (#${channel.name})` : channel.name}`)
        .setColor(_.colors.good)
        .addField("Channel ID", channel.id)
        .addField("Channel Creator", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};