module.exports = async (client, role) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await role.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = [""];

    return new Discord.RichEmbed()
        .setAuthor("Role Deleted", role.guild.iconURL)
        .setDescription(role.name)
        .setColor(_.colors.bad)
        .addField("Role ID", role.id)
        .addField("Role Deleter", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();
};