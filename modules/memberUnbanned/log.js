module.exports = async (client, guild, user) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = ["Kinda surprised tbh", "Didn't expect *that* to happen...", "Hooray I guess", "Is this supposed to bring joy?", "Now we can raise that member count back up", "Oh it can come back now", "Good for them"];

    return new Discord.RichEmbed()
        .setAuthor("Member Unbanned", guild.iconURL)
        .setDescription(`${user} (${user.tag})`)
        .setColor(_.colors.good)
        .addField("User ID", user.id)
        .addField("Member Unbanner", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};