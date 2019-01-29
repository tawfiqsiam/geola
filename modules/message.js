module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const runningModules = [];

    //Check for webhooks
    if (message.webhookID) return;

    //Check for blacklist
    if (await _.blacklisted(client, message.guild, message.author)) return;

    //DM commands
    if (!message.author.bot) {
        if ((message.content.toLowerCase().replace(/\s+/g, "").startsWith(`g!help`)) && (!message.guild)) client.modules.help(client, message); //help
        if ((message.content.toLowerCase().replace(/\s+/g, "").startsWith(`g!badgealerts`)) && (!message.guild)) client.modules.badgeAlerts(client, message); //badge alerts
    }

    //Check for DMs
    if (message.channel.type === "dm") return;

    //Get data
    message.guild.data = await models.servers.findByIdAndUpdate(message.guild.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    message.channel.data = await models.channels.findByIdAndUpdate(message.channel.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    message.author.data = await models.users.findByIdAndUpdate(message.author.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    message.member.data = await models.members.findByIdAndUpdate({ server: message.guild.id, user: message.author.id }, {}, { upsert: true, setDefaultsOnInsert: true, new: true });

    //XP gain
    runningModules.push(client.modules.xpGain(client, message));
    runningModules.push(client.modules.globalXPGain(client, message));

    //Check for bots
    if (message.author.bot) {

        await Promise.all(runningModules);
        await _.save(client, message.author.data, message.member.data);

        return;
    }

    //Clean docs
    _.clean(client, message.guild.data);

    //Get Modules
    const { commands, messageProcessors, timedMessageProcessors } = _;

    //Message Processors
    messageProcessors.forEach(mp => runningModules.push(client.modules[mp](client, message)));

    //Match Command
    const simplifiedMessage = message.content.toLowerCase().replace(/\s+/g, "");
    let command = commands
        .find(c => c.inputs
            .some(i => (
                simplifiedMessage === `${c.access === "owner" ? "g#" : message.guild.data[c.access === "everyone" ? "prefix" : "modPrefix"]}${i}` ||
                message.content.toLowerCase().startsWith(`${c.access === "owner" ? "g#" : message.guild.data[c.access === "everyone" ? "prefix" : "modPrefix"]}${i} `)
            ))
        );
    command = command && command.file;
    if (simplifiedMessage.startsWith("poll:")) command = "poll"; //poll
    if (simplifiedMessage.startsWith(`${message.guild.data.prefix}sayembed`)) command = "sayEmbed"; //say embed (with params after enter)
    if ((simplifiedMessage.startsWith("<@520384353931493378>")) || (simplifiedMessage.startsWith("<@!520384353931493378>")) || (simplifiedMessage.startsWith("geola,"))) command = "talk"; //talk

    command = client.modules[command];
    if (typeof command === "function") runningModules.push(command(client, message));
    else if (typeof command === "object") runningModules.push(command.main(client, message));

    //Await running modules
    await Promise.all(runningModules);

    //Save docs
    await _.save(client, message.guild.data, message.channel.data, message.author.data, message.member.data);

    //Timed Message Processors
    for (let mp of timedMessageProcessors) await client.modules[mp](client);
};