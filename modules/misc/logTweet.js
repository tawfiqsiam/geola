module.exports = async (client, tweet) => {

    //Pre Module
    const { Discord } = client.modules.misc.preModule(client);

    //Filter out retweets
    if (tweet.retweeted_status) return;

    //Filter out tweets from @geolabot
    if (tweet.user.id_str === "929863537937154049") return;

    //Filter out tweets from spam users
    if (["1027572102562504704"].includes(tweet.user.id_str)) return;

    //Embed
    const embed = new Discord.RichEmbed()
        .setTitle(`New Tweet by @${tweet.user.screen_name}`)
        .setDescription(tweet.text)
        .setColor(0x1da1f2)
        .addField("Link", `[twitter.com...](https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str})`)
        .setTimestamp();

    //Send
    const m = await client.tweets.send(embed);
    m.react("✅");
};