module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Emoji", 3000)) return;

    //Get emoji from param
    let emoji = message.content.split(" ").slice(1).join(" ");

    //No emoji specified
    if (emoji === "") return _.send({
        client,
        id: "emoji no emoji entered",
        channel: message.channel,
        message: "You must specify an emoji!",
        emoji: "x"
    });

    //Get emoji object
    emoji = _.findEmoji(message.guild, emoji);

    //No emoji found
    if (!emoji) return _.send({
        client,
        id: "emoji no emoji",
        channel: message.channel,
        message: "I couldn't find that emoji!",
        emoji: "x"
    });

    //Check for just ID
    if (message.content.toLowerCase().split(" ")[0].endsWith("emojiid")) return message.channel.send(emoji.id);

    //Uploader
    let uploader = await emoji.fetchAuthor();

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`:${emoji.name}:`, emoji.url, emoji.url)
        .setDescription(`Uploaded by **${uploader.tag}** (${uploader.id})`)
        .setColor(await _.getColor(emoji.url))
        .addBlankField(true)
        .addField("Animated", emoji.animated ? "YAS!" : "Nope :(", true)
        .addBlankField(true)
        .addField("Emoji Link", `[discordapp.com...](${emoji.url})`)
        .addField("Created On", _.englishDate(emoji.createdAt))
        .setFooter(`Emoji ID: ${emoji.id}`);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Emoji");
};