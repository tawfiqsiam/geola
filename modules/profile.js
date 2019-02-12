module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Profile", 3000)) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");
    if (target === "") target = message.author.id;

    //Parse params
    target = await _.findMember(message.guild, target);

    //No user
    if (!target) return _.send({
        client,
        id: "profile no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Parse user
    target = target.user;

    //Save data
    await _.save(client, message.member.data);

    //Get data
    const data = target.id === message.author.id ?
        message.member.data :
        await models.members.findById({ server: message.guild.id, user: target.id });

    //Get leaderboard rank
    const rank = await models.members.countDocuments({
        "_id.server": message.guild.id,
        bot: target.bot,
        "xp.totalXP": { $gte: data.xp.totalXP }
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(target.tag, target.displayAvatarURL, target.displayAvatarURL)
        .setColor(await _.getColor(target.displayAvatarURL))
        .addField("Level", data.xp.level, true)
        .addField("XP", `${data.xp.xp}/${(data.xp.level * 50) + 200}`, true)
        .addField("Total XP", data.xp.totalXP, true)
        .addField(message.guild.data.currencyName, data.currency, true)
        .addField(`${target.bot ? "Bot " : ""}Leaderboard Rank`, `#${rank}`, true)
        .addField("Warnings", data.warnings.length, true);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Profile");
};