module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check for webhooks
    if (message.webhookID) return;

    //Check for blacklist
    if (await _.blacklisted(client, message.guild, message.author)) return;

    //Check for bots
    if (message.author.bot) return;

    //DM commands
    if ((message.content.toLowerCase().replace(/\s+/g, "").startsWith(`g!help`)) && (!message.guild)) client.modules.help(client, message); //help
    if ((message.content.toLowerCase().replace(/\s+/g, "").startsWith(`g!badgealerts`)) && (!message.guild)) client.modules.badgeAlerts(client, message); //badge alerts

    //Check for DMs
    if (message.channel.type === "dm") return;

    //Validate DB entries
    let server = await models.servers.findByIdAndUpdate(message.guild.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    let channel = await models.channels.findByIdAndUpdate(message.channel.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    let user = await models.users.findByIdAndUpdate(message.author.id, {}, { upsert: true, setDefaultsOnInsert: true, new: true });
    let member = await models.members.findByIdAndUpdate({ server: message.guild.id, user: message.author.id }, {}, { upsert: true, setDefaultsOnInsert: true, new: true });

    //Set object data
    message.guild.data = server;
    message.channel.data = channel;
    message.author.data = user;
    message.member.data = member;

    //Clean docs
    _.clean(client, message.guild.data);

    //Get Modules
    const { commands, messageProcessors, timedMessageProcessors } = _;
    const runningModules = [];

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
    const guildSave = models.servers.findByIdAndUpdate(message.guild.id, message.guild.data.toObject()).exec();
    const channelSave = models.channels.findByIdAndUpdate(message.channel.id, message.channel.data.toObject()).exec();
    const authorSave = models.users.findByIdAndUpdate(message.author.id, message.author.data.toObject()).exec();
    const memberSave = models.members.findByIdAndUpdate(message.member.id, message.member.data.toObject()).exec();

    await Promise.all([guildSave, channelSave, authorSave, memberSave]);

    //Timed Message Processors
    for (let mp of timedMessageProcessors) await client.modules[mp](client);
};