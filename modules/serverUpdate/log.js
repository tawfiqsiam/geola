module.exports = async (client, oldGuild, newGuild) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.serverUpdate;

    await newGuild.fetchMember(oldGuild.ownerID);
    await newGuild.fetchMember(newGuild.ownerID);

    let audit = await newGuild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = [""];

    const embed = new Discord.RichEmbed()
        .setAuthor("Server Edited", newGuild.iconURL)
        .setDescription(newGuild.name)
        .setColor(_.colors.good)
        .addField("Server ID", newGuild.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    const oldGuildPatched = modules.patch({
        name: { name: "Name", value: oldGuild.name },
        owner: { name: "Owner", value: oldGuild.owner, id: oldGuild.ownerID },
        iconURL: { name: "Icon", value: oldGuild.iconURL },
        afkChannel: { name: "AFK Channel", value: oldGuild.afkChannel && oldGuild.afkChannel.name, id: oldGuild.afkChannelID },
        splashURL: { name: "Splash URL", value: oldGuild.splashURL },
        systemChannel: { name: "Welcome Messages Channel", value: oldGuild.systemChannel && oldGuild.systemChannel.name, id: oldGuild.systemChannelID },
        verificationLevel: { name: "Verification Level", value: oldGuild.verificationLevel },
        explicitContentFilter: { name: "Explicit Content Filter", value: oldGuild.explicitContentFilter },
        afkTimeout: { name: "AFK Timeout", value: oldGuild.afkTimeout },
        region: { name: "Region", value: oldGuild.region }
    });
    const newGuildPatched = modules.patch({
        name: { name: "Name", value: newGuild.name },
        owner: { name: "Owner", value: newGuild.owner, id: newGuild.ownerID },
        iconURL: { name: "Icon", value: newGuild.iconURL },
        afkChannel: { name: "AFK Channel", value: newGuild.afkChannel && newGuild.afkChannel.name, id: newGuild.afkChannelID },
        splashURL: { name: "Splash URL", value: newGuild.splashURL },
        systemChannel: { name: "Welcome Messages Channel", value: newGuild.systemChannel && newGuild.systemChannel.name, id: newGuild.systemChannelID },
        verificationLevel: { name: "Verification Level", value: newGuild.verificationLevel },
        explicitContentFilter: { name: "Explicit Content Filter", value: newGuild.explicitContentFilter },
        afkTimeout: { name: "AFK Timeout", value: newGuild.afkTimeout },
        region: { name: "Region", value: newGuild.region }
    });

    for (let prop in newGuildPatched) {
        if (oldGuildPatched[prop].value !== newGuildPatched[prop].value) embed.addField(
            newGuildPatched[prop].name,
            `${oldGuildPatched[prop].value} >> ${newGuildPatched[prop].value}`
        );
    }

    embed.addField("Server Editor", `${audit.executor} (${audit.executor.id})`);

    return embed;
};