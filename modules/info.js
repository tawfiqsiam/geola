module.exports = async (client, message) => {

    //Pre Module
    const { Discord, mongoose, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Info", 2000)) return;

    //Get data
    let data = await models.data.findOne();

    //Get bot version
    let version = ((data.updates + 10) / 10).toString();
    if (!version.includes(".")) version = `${version}.0`;

    //Get memory usage
    let memoryUsage = Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100;

    //Get DB Size
    let dbSize = await mongoose.connection.db.stats();
    dbSize = Math.round(dbSize.storageSize / 1024 / 1024 * 100) / 100;

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor("Geola", client.user.displayAvatarURL, "http://geolabot.com")
        .setDescription(`Geola is a premium-grade Discord bot that focuses on customization. We cover all the basics, such as moderation, utility, etc., but we really shine with *customizing*  those "basic" features. For instance, Bot Logs. Instead of just assigning a channel for them, why not assign what actually gets logged? Ever wish Discord would remember the roles of a member, in case they left and joined later on? Fixed that for you. Oh and we also cover nicknames. It's the little things that Geola introduces, that come together to enrich your server's experience for the people that matter the most - your members.`)
        .setColor(_.colors.geola)
        .addField("Credits", `
                Developed by **APixel Visuals#2820**
                Hosted by **DigitalOcean**
                Domain reserved by **NameCheap**
            `, true)
        .addField("Technical Stats", `
                Bot version **${version}** (**${data.updates}** total updates!)
                **${memoryUsage} MB** of memory usage
                **${dbSize} MB** of database space used
            `, true)
        .addBlankField(true)
        .addField("Bot Stats", `
                **${client.guilds.size}** Servers
                **${client.channels.size}** Channels
                **${client.users.size}** Users
            `, true)
        .addBlankField(true)
        .addField("\u200b", "[Add Me](http://geolabot.com/invite) \u2022 [My Hub (Support Server)](https://discord.gg/eCDafVC) \u2022 [Website](http://geolabot.com) \u2022 [Wiki](http://geolabot.com/wiki) \u2022 [Donate](http://geolabot.com/donate) \u2022 [Upvote](https://discordbots.org/bot/298920361548840960)");

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Info");
};