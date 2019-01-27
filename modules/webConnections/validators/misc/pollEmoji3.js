module.exports = (client, emoji, { server }) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const emojilib = require("emojilib");

    //Prepare poll emojis object
    if (!server.data.pollEmojis) server.data.pollEmojis = {};

    //Parse emoji
    emoji = emoji.toLowerCase().replace(/\s+/g, "_").replace(/:/g, "");

    //No emoji provided or default emoji provided
    if ((emoji === "") || (emoji === "👎")) return server.data.pollEmojis["3"] = undefined;

    //Check for custom emoji
    let parsedEmoji = _.findEmoji(server, emoji);
    if (parsedEmoji) parsedEmoji = parsedEmoji.id;

    //Check for emoji name
    if (!parsedEmoji) parsedEmoji = emojilib.lib[emoji] && emojilib.lib[emoji].char;

    //Assume unicode
    if (!parsedEmoji) {
        if (emoji.length > 5) return;
        parsedEmoji = emoji;
    }

    //Set emoji 3
    server.data.pollEmojis["3"] = parsedEmoji;
};