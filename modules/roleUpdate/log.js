module.exports = async (client, oldRole, newRole) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.roleUpdate;

    let audit = await newRole.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = [""];

    const embed = new Discord.RichEmbed()
        .setAuthor("Role Edited", newRole.guild.iconURL)
        .setDescription(newRole.name)
        .setColor(_.colors.good)
        .addField("Role ID", newRole.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    const oldRolePatched = modules.patch({
        name: { name: "Name", value: oldRole.name },
        hexColor: { name: "Hex Color", value: oldRole.hexColor },
        color: { name: "Base 10 Color", value: oldRole.color },
        hoist: { name: "Hoisted", value: oldRole.hoist },
        mentionable: { name: "Mentionable", value: oldRole.mentionable }
    });
    const newRolePatched = modules.patch({
        name: { name: "Name", value: newRole.name },
        hexColor: { name: "Hex Color", value: newRole.hexColor },
        color: { name: "Base 10 Color", value: newRole.color },
        hoist: { name: "Hoisted", value: newRole.hoist },
        mentionable: { name: "Mentionable", value: newRole.mentionable }
    });

    for (let prop in newRolePatched) {
        if (oldRolePatched[prop].value !== newRolePatched[prop].value) embed.addField(
            newRolePatched[prop].name,
            `${oldRolePatched[prop].value} >> ${newRolePatched[prop].value}`
        );
    }

    embed.addField("Role Editor", `${audit.executor} (${audit.executor.id})`);

    return embed;
};