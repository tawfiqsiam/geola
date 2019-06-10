module.exports = async client => {

    //Pre module
    const Twit = require("twit");

    //Only use in production
    if (process.env.DEV === "true") return;

    //Initialize twit
    const twit = new Twit({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    //Stream tweets
    const stream = twit.stream("statuses/filter", {
        track: "geola, mee6, need discord bot, looking for discord bot",
        follow: "724434543126667265"
    });
    stream.on("tweet", tweet => client.modules.misc.logTweet(client, tweet));
};