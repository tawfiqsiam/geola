module.exports = (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    const messages = [""];

    const embed = new Discord.RichEmbed()
        .setAuthor("Message Deleted", message.guild.iconURL)
        .setDescription(message.content)
        .setColor(_.colors.bad)
        .addField("Sender", `${message.author} (${message.author.id})`)
        .addField("Channel", `${message.channel} (${message.channel.id})`)
        .addField("Message ID", message.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    const attachment = message.attachments.array()[0];
    if (attachment) embed.addField("Attachment", `[${attachment.filename}](${attachment.url})`);

    return embed;
};