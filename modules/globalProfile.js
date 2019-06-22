module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Global Profile", 3000)) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ").replace(/[<>@!]/g, "");
    if (target === "") target = message.author.id;

    //Parse params
    target = await _.findMember(message.guild, target) || client.users.get(target);

    //No user
    if (!target) return _.send({
        client,
        id: "global profile no user",
        channel: message.channel,
        message: "I couldn't find that user! Make sure that I share a server with them",
        emoji: "x"
    });

    //Parse user
    target = target.user || target;

    //Save data
    await _.save(client, message.author.data);

    //Get data
    const data = target.id === message.author.id ?
        message.author.data :
        await models.users.findById(target.id);

    //Get leaderboard rank
    const rank = await models.users.countDocuments({
        bot: target.bot,
        "xp.totalXP": { $gte: data.xp.totalXP }
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(target.tag, target.displayAvatarURL, `https://geolabot.com/profile/${target.id}`)
        .setColor(await _.getColor(target.displayAvatarURL))
        .addField("Level", data.xp.level, true)
        .addField("XP", `${data.xp.xp}/${(data.xp.level * 50) + 200}`, true)
        .addField("Total XP", data.xp.totalXP, true)
        .addField("Cubits", data.cubits, true)
        .addField(`Global ${target.bot ? "Bot " : ""}Leaderboard Rank`, `#${rank}`, true)
        .addField("Reputation", data.reputation, true);

    //Send
    message.channel.send(embed);

    //Profile stat
    if (target.id === message.author.id) { //Make sure they are checking their own profile

        //Update profile count
        data.stats.selfProfileChecks = data.stats.selfProfileChecks + 1 || 1;

        //Badge
        if (data.stats.selfProfileChecks + 1 === 100) _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Self Pride"
        });
    }

    //Post command
    await _.postCommand(client, message, "Global Profile");
};