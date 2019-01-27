module.exports = async (client, oldEmoji, newEmoji) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const modules = client.modules.emojiUpdate;

    let audit = await newEmoji.guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = [""];

    const embed = new Discord.RichEmbed()
        .setAuthor("Emoji Edited", newEmoji.guild.iconURL)
        .setDescription(newEmoji.name)
        .setColor(_.colors.good)
        .addField("Emoji ID", newEmoji.id)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    const oldEmojiPatched = modules.patch({
        name: { name: "Name", value: oldEmoji.name }
    });
    const newEmojiPatched = modules.patch({
        name: { name: "Name", value: newEmoji.name }
    });

    for (let prop in newEmojiPatched) {
        if (oldEmojiPatched[prop].value !== newEmojiPatched[prop].value) embed.addField(
            newEmojiPatched[prop].name,
            `${oldEmojiPatched[prop].value} >> ${newEmojiPatched[prop].value}`
        );
    }

    embed.addField("Emoji Editor", `${audit.executor} (${audit.executor.id})`);

    return embed;
};