module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Global Leaderboard", 4000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");
    let page = parseInt(PARAMS.replace(/[^0-9]/g, ""));
    let bot = PARAMS.includes("bot");
    let type = ["cubit", "cubits", "currency", "money", "$"].some(t => PARAMS.includes(t)) ? "cubits" : "xp";

    //Parse params
    if ((isNaN(page)) || (page < 1)) page = 1;
    let place = 5 * (page - 1);

    //Save data
    await _.save(client, message.author.data);

    //Get data
    let data = await models.users.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: ["$bot", bot] },
                        { $gt: [type === "xp" ? "$xp.totalXP" : "$cubits", 0] }
                    ]
                }
            }
        },
        { $sort: { [type === "xp" ? "xp.totalXP" : "cubits"]: -1 } },
        { $skip: place },
        { $limit: 5 }
    ]);

    //Page too high
    if (data.length === 0) return _.send({
        client,
        id: "global leaderboard page too high",
        channel: message.channel,
        message: "The leaderboard doesn't go that high! Try a lower page number",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`Global ${bot ? "Bot " : ""}Leaderboard`, client.user.displayAvatarURL, "https://geolabot.com/leaderboard")
        .setDescription(`${type === "xp" ? "XP" : "Cubits"}, Page ${page}`)
        .setColor(_.colors.geola)
        .setTimestamp();

    //Loop through users
    for (let u of data) {

        //Increment place
        place = place + 1;

        const user = client.users.get(u._id) || await client.fetchUser(u._id);
        embed.addField(
            `${place}. ${user.tag}`,
            type === "xp" ?
                `Level ${u.xp.level} - ${u.xp.totalXP} Total XP` :
                `${u.cubits} Cubits`
        );
    }

    //Self
    if (!bot) {

        //Get data
        let self = await models.users.countDocuments({
            bot,
            [type === "xp" ? "xp.totalXP" : "cubits"]: { $gte: type === "xp" ? message.author.data.xp.totalXP : message.author.data.cubits }
        });

        embed.addField("Your Rank", `**#${self}**`);
    }

    //Easter egg
    if ((page === 1) && (type === "xp")) embed.setFooter(`Looks like ${client.users.get(data[0]._id).username} has the least of a life out of all of us...`);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Global Leaderboard");
};