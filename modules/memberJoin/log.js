module.exports = (client, member) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    const messages = ["What a wonderful creature", "YAY!", "For sure won't be treated poorly", "This is good.", "Higher member count! Great!", "YAS!", ":D"];

    return new Discord.RichEmbed()
        .setAuthor("New Member", member.user.displayAvatarURL)
        .setDescription(`${member} (${member.user.tag})`)
        .setColor(_.colors.good)
        .addField("User ID", member.id)
        .addField("Account Created", _.englishDate(member.user.createdAt))
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};