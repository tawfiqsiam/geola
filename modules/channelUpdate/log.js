module.exports = async (client, oldChannel, newChannel) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.channelUpdate;

    let audit = await newChannel.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = ["Seems very F R E S H"];

    const embed = new Discord.RichEmbed()
        .setAuthor("Channel Edited", newChannel.guild.iconURL)
        .setDescription(`${newChannel.type === "text" ? `${newChannel} (#${newChannel.name})` : newChannel.name}`)
        .setColor(_.colors.good)
        .addField("Channel ID", newChannel.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    const oldChannelPatched = modules.patch({
        name: { name: "Name", value: oldChannel.name },
        topic: { name: "Topic", value: oldChannel.topic },
        nsfw: { name: "NSFW", value: oldChannel.nsfw }
    });
    const newChannelPatched = modules.patch({
        name: { name: "Name", value: newChannel.name },
        topic: { name: "Topic", value: newChannel.topic },
        nsfw: { name: "NSFW", value: newChannel.nsfw }
    });

    for (let prop in newChannelPatched) {
        if (oldChannelPatched[prop].value !== newChannelPatched[prop].value) embed.addField(
            newChannelPatched[prop].name,
            `${oldChannelPatched[prop].value} >> ${newChannelPatched[prop].value}`
        );
    }

    embed.addField("Channel Editor", `${audit.executor} (${audit.executor.id})`);

    return embed;
};