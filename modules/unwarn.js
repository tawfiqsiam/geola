module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if ((!message.member.hasPermission("KICK_MEMBERS")) || (!message.member.hasPermission("BAN_MEMBERS"))) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let number = parseInt(PARAMS.slice(2).join(" "));

    //No user specified
    if (target === "") return _.send({
        client,
        id: "unwarn no user entered",
        channel: message.channel,
        message: "You must specify who you want to unwarn!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "unwarn no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get data
    const data = target.id === message.author.id ?
        message.member.data :
        await models.members.findById({ server: message.guild.id, user: target.id });

    //Parse number
    if (isNaN(number)) number = data.warnings.length;

    //Number too high
    if (number > data.warnings.length) return _.send({
        client,
        id: "unwarn number too high",
        channel: message.channel,
        message: "That user doesn't have that many warnings!",
        emoji: "x"
    });

    //Remove warning
    data.warnings.splice(number - 1, 1);
    await _.save(client, data);

    //Send
    _.send({
        client,
        id: "unwarned",
        channel: message.channel,
        message: "{VAR1} has been unwarned!",
        emoji: "white_check_mark",
        vars: [target]
    });

    //Stats
    await _.stats(client, "Warnings Taken");
};