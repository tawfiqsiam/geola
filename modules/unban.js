module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("BAN_MEMBERS")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let reason = PARAMS.slice(2).join(" ");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "unban no user entered",
        channel: message.channel,
        message: "You must specify who you want to unban!",
        emoji: "x"
    });

    //Fetch bans
    const bans = await message.guild.fetchBans();

    //Get user object
    target = bans.filter(u => (u.id === target) || (u.tag === target)).array()[0];

    //No user found
    if (!target) return _.send({
        client,
        id: "unban no user",
        channel: message.channel,
        message: "That user isn't banned!",
        emoji: "x"
    });

    //Unban
    let unbanned = await _.promise(message.guild.unban(target, reason), true);

    if (unbanned) {
        //Unbanned

        //Send
        _.send({
            client,
            id: "unbanned",
            channel: message.channel,
            message: `{VAR1} has been unbanned!`,
            emoji: "white_check_mark",
            vars: [target]
        });

        //Stats
        await _.stats(client, "Unbans");
    }
    else _.send({ //missing perms
        client,
        id: "unban missing perms",
        channel: message.channel,
        message: "I don't have permission to unban that user!",
        emoji: "x"
    });
};