module.exports = async (client, guild, user, globalBanned) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    let audit = await guild.fetchAuditLogs({ limit: 1 });
    audit = audit.entries.array()[0];

    const messages = ["Braindead turtle", "What a turd", "Chunk of garbage", "Headless horseradish", "Wasted attempt at raising the member count I see", "Hah. Now you can't come back. Ever.", ">:D", "Good thing its gone", "Now what're they gonna do JAJA", "Headshot.", "Sniped.", "Hahahaha lame", "RIP member count tho", "Hah. Now you can't come back.", ">:)"];

    const embed = new Discord.RichEmbed()
        .setAuthor("Member Banned", guild.iconURL)
        .setDescription(`${user} (${user.tag})`)
        .setColor(_.colors.bad)
        .addField("User ID", user.id)
        .addField("Member Banner", `${audit.executor} (${audit.executor.id})`)
        .setFooter(messages[Math.floor(Math.random() * messages.length)])
        .setTimestamp();

    if (globalBanned) embed.addField("Global Ban Reason", globalBanned.reason);

    return embed;
};