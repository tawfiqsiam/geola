module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "User", 3000)) return;

    //Get user from param
    let user = message.content.split(" ").slice(1).join(" ").replace(/[<>@!]/g, "");
    if (user === "") user = message.author.id;

    //Get user object
    user = client.users.get(user);

    //No user found
    if (!user) return _.send({
        client,
        id: "user no user",
        channel: message.channel,
        message: "I couldn't find that user! Make sure that I share a server with them",
        emoji: "x"
    });

    //Check for just ID
    if (message.content.toLowerCase().split(" ")[0].endsWith("userid")) return message.channel.send(user.id);

    //Get user data
    let userData = user.id === message.author.id ?
        message.author.data :
        await models.users.findById(user.id);

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(user.tag, user.displayAvatarURL, user.displayAvatarURL)
        .setDescription(user.presence.game ? `Playing **${user.presence.game.name}**` : "*Playing with the void*")
        .setColor(await _.getColor(user.displayAvatarURL))
        .addField("Avatar Link", `[discordapp.com...](${user.displayAvatarURL})`)
        .addField("Registered On", _.englishDate(user.createdAt))
        .setFooter(`User ID: ${user.id}`);

    if (userData.get("verified")) {
        embed
            .addBlankField(true)
            .addField("Verified", "It's pretty legit", true)
            .addBlankField(true);
    }

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "User");
};