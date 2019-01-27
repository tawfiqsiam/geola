module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Channel", 3000)) return;

    //Get channel from param
    let channel = message.content.split(" ").slice(1).join(" ").replace(/[<>#]/g, "");
    if (channel === "") channel = message.channel.id;

    //Get channel object
    channel = _.findChannel(message.guild, channel);

    //No channel found
    if (!channel) return _.send({
        client,
        id: "channel no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Check for just ID
    if (message.content.toLowerCase().split(" ")[0].endsWith("channelid")) return message.channel.send(channel.id);

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${channel.type === "text" ? "#" : ""}${channel.name}`, channel.guild.iconURL)
        .setDescription(channel.topic ? channel.topic : "")
        .setColor(await _.getColor(channel.guild.iconURL))
        .addField("Type", `${channel.type.charAt(0).toUpperCase()}${channel.type.slice(1)}`, true)
        .setFooter(`Channel ID: ${channel.id}`);

    if (channel.type === "category") {
        let textChildren = channel.children.filter(c => c.type === "text").size;
        let voiceChildren = channel.children.filter(c => c.type === "voice").size;
        let totalChildren = channel.children.size;

        embed.addField("Sub-Channels", `**${textChildren}** Text Channels\n**${voiceChildren}** Voice Channels\n**${totalChildren} Total Channels**`, true);
    }
    else embed.addField("Category", channel.parent ? channel.parent.name : "*None*", true);

    embed
        .addField("NSFW", channel.nsfw ? "Yup ;)" : "Nope", true)
        .addField("Created On", _.englishDate(channel.createdAt));

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Channel");
};