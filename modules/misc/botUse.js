module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Update bot use
    let botUse = client.botUse.get(message.author.id);
    botUse = botUse + 1 || 1;
    client.botUse.set(message.author.id, botUse);

    //Alert
    if (botUse === 10) {

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor("Alert!", client.user.displayAvatarURL)
            .setDescription("Bot use per 10 seconds has exceeded 10!")
            .setColor(_.colors.bad)
            .addField("User", `${message.author} (${message.author.tag} / ${message.author.id})`)
            .setTimestamp();

        if (message.channel.type === "dm") embed.addField("Channel", "DMs");
        else {
            embed
                .addField("Server", `${message.guild.name} (${message.guild.id})`)
                .addField("Channel", `#${message.channel.name} (${message.channel.id})`);
        }

        //Send
        client.alert(embed);
        let m = await client.alert(client.developerRole.toString());
        m.delete();
    }
};