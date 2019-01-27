module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const YouTube = require("youtube-node");

    //Pre command
    if (!await _.preCommand(client, message, "YouTube", 3000)) return;

    //Construct YouTube object
    const youtube = new YouTube();
    youtube.setKey(process.env.YOUTUBE_KEY);

    //Get params
    const query = message.content.split(" ").slice(1).join(" ");

    //No query
    if (query === "") return _.send({
        client,
        id: "youtube nothing searched",
        channel: message.channel,
        message: "You must provide something to search!",
        emoji: "x"
    });

    //Fetch
    youtube.search(query, 1, { type: "video" }, async (err, result) => {

        //Parse
        result = result.items[0];

        //No results
        if (!result) return _.send({
            client,
            id: "youtube no results",
            channel: message.channel,
            message: "No results!",
            emoji: "x"
        });

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor(result.snippet.title, "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/youtube-red-square.png", `https://youtube.com/watch?v=${result.id.videoId}`)
            .setDescription(result.snippet.description)
            .setColor(0xff0000)
            .addField("Uploaded By", `[${result.snippet.channelTitle}](https://youtube.com/c/${result.snippet.channelId})`)
            .addField("Uploaded On", _.englishDate(result.snippet.publishedAt));

        //Send
        message.channel.send(`https://youtube.com/watch?v=${result.id.videoId}`, embed);

        //Post command
        await _.postCommand(client, message, "YouTube");
    });
};