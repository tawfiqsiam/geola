module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Reputation", 2000)) return;

    //Cooldown not done
    let cooldown = message.author.data.reputationCooldown;
    if ((cooldown) && (cooldown > Date.now())) {

        cooldown = (cooldown - Date.now()) / 1000;

        return _.send({
            client,
            id: "rep cooldown",
            channel: message.channel,
            message: "You're giving out reputation too quickly! Please wait another {VAR1} hours, {VAR2} minutes, and {VAR3} seconds",
            emoji: "x",
            vars: [Math.floor(cooldown / 3600), Math.floor(cooldown % 3600 / 60), Math.floor(cooldown % 3600 % 60)]
        });
    }

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "rep no user entered",
        channel: message.channel,
        message: "You must specify who you want to rep!",
        emoji: "x"
    });

    //Parse params
    target = await _.findMember(message.guild, target) || client.users.get(target);

    //No user
    if (!target) return _.send({
        client,
        id: "rep no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Parse user
    target = target.user || target;

    //User is self
    if (target.id === message.author.id) return _.send({
        client,
        id: "rep cant rep self",
        channel: message.channel,
        message: "You can't just rep yourself {VAR1}",
        emoji: "x",
        vars: [client.emojis.get("497633272801525781")] //:lul3d:
    });

    //Add rep
    let data = await models.users.findById(target.id);
    data.reputation = data.reputation + 1 || 1;
    await _.save(client, data);

    //Set cooldown
    message.author.data.reputationCooldown = Date.now() + 43200000;

    //Send
    _.send({
        client,
        id: "rep given",
        channel: message.channel,
        message: "You have given a reputation point to {VAR1}!",
        emoji: "arrow_up_small",
        vars: [target]
    });

    //Stats
    await _.stats(client, "Reputation Given");

    //Post command
    await _.postCommand(client, message);
};