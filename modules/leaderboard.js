module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Leaderboard", 4000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");
    let page = parseInt(PARAMS.replace(/[^0-9]/g, ""));
    let bot = PARAMS.includes("bot");
    let type = ["currency", "money", "$"].some(t => PARAMS.includes(t)) ? "currency" : "xp";

    //Parse params
    if ((isNaN(page)) || (page < 1)) page = 1;
    let place = 5 * (page - 1);

    //Save data
    await _.save(client, message.member.data);

    //Get data
    let data = await models.members.aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: ["$_id.server", message.guild.id] },
                        { $eq: ["$bot", bot] },
                        { $gt: [type === "xp" ? "$xp.totalXP" : "$currency", 0] }
                    ]
                }
            }
        },
        { $sort: { [type === "xp" ? "xp.totalXP" : "currency"]: -1 } },
        { $skip: place },
        { $limit: 5 }
    ]);

    //Page too high
    if (data.length === 0) return _.send({
        client,
        id: "leaderboard page too high",
        channel: message.channel,
        message: "The leaderboard doesn't go that high! Try a lower page number",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`Server ${bot ? "Bot " : ""}Leaderboard`, message.guild.iconURL)
        .setDescription(`${type === "xp" ? "XP" : "Currency"}, Page ${page}`)
        .setColor(await _.getColor(message.guild.iconURL))
        .setTimestamp();

    //Loop through users
    for (let u of data) {

        //Increment place
        place = place + 1;

        const user = client.users.get(u._id.user) || await client.fetchUser(u._id.user);
        embed.addField(
            `${place}. ${user.tag}`,
            type === "xp" ?
                `Level ${u.xp.level} - ${u.xp.totalXP} Total XP` :
                `${u.currency} ${message.guild.data.currencyName}`
        );
    }

    //Self
    if (!bot) {

        //Get data
        let self = await models.members.countDocuments({
            "_id.server": message.guild.id,
            bot,
            [type === "xp" ? "xp.totalXP" : "currency"]: { $gte: type === "xp" ? message.member.data.xp.totalXP : message.member.data.currency }
        });

        embed.addField("Your Rank", `**#${self}**`);
    }

    //Easter egg
    if ((page === 1) && (type === "xp")) embed.setFooter(`Looks like ${client.users.get(data[0]._id.user).username} has the least of a life out of all of us...`);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Leaderboard");
};