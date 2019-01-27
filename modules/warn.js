module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if ((!message.member.hasPermission("KICK_MEMBERS")) || (!message.member.hasPermission("BAN_MEMBERS"))) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let reason = PARAMS.slice(2).join(" ");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "warn no user entered",
        channel: message.channel,
        message: "You must specify who you want to warn!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "warn no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get data
    const data = target.id === message.author.id ?
        message.member.data :
        await models.members.findById({ server: message.guild.id, user: target.id });

    //Max warnings
    if (data.warnings.length === 300) return _.send({
        client,
        id: "warn max warnings",
        channel: message.channel,
        message: "That user has hit the maximum amount of warnings! If they're that bad, just kick, ban, or mute them. Or, if you really need a higher cap, you can ask nicely in the `#support` channel of my Hub (support server) and maybe we can raise the cap. Use `{VAR1}` for an invite",
        emoji: "x",
        vars: [`${message.guild.data.prefix}support`]
    });

    //Add warning
    data.warnings.push(reason);
    await _.save(client, data);

    //Warning action
    const warningActions = message.guild.data.warningActions;
    if (data.warnings.length === warningActions.kick) target.kick(`Reached ${warningActions.kick} warnings`);
    else if (data.warnings.length === warningActions.ban) target.ban({ reason: `Reached ${warningActions.ban} warnings` });

    //Send
    _.send({
        client,
        id: "warned",
        channel: message.channel,
        message: "{VAR1} has been warned!",
        emoji: "white_check_mark",
        vars: [target]
    });

    //Stats
    await _.stats(client, "Warnings Given");
};