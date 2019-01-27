module.exports = (client, member) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    const messages = ["Worthless animal", "smh", "What did we ever do to them?", "Wow. Just wow.", "But we need a higher member count!", "COME BACK!", ":("];

    return new Discord.RichEmbed()
        .setAuthor("Member Left", member.user.displayAvatarURL)
        .setDescription(`${member} (${member.user.tag})`)
        .setColor(_.colors.bad)
        .addField("User ID", member.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};