module.exports = async (client, messages) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const message = messages.array()[0];

    //Paste
    const link = await _.paste({
        name: "Deleted Messages",
        description: `${messages.size} messages pruned`,
        content: messages.array().reverse().map(m => `${m.author.tag} (${m.author.id}):\n${m.content}`).join("\n\n")
    });

    const msgs = [""];

    return new Discord.RichEmbed()
        .setAuthor(`${messages.size} Messages Pruned`, message.guild.iconURL)
        .setDescription(link)
        .setColor(_.colors.bad)
        .addField("Channel", `${message.channel} (${message.channel.id})`)
        .setFooter(msgs[Math.floor(Math.random() * msgs.length)])
        .setTimestamp();
};