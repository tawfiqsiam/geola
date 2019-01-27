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
        id: "ban no user entered",
        channel: message.channel,
        message: "You must specify who you want to ban!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true) || target;

    //Position perms
    if ((typeof target === "object") && (message.member.highestRole.comparePositionTo(target.highestRole) < 0) && (message.author.id !== message.guild.owner.id)) return _.send({
        client,
        id: "ban no position perms",
        channel: message.channel,
        message: "You don't have permission to ban that user!",
        emoji: "x"
    });

    //Ban
    let banned = await _.promise(message.guild.ban(target, { reason }), true);

    if (banned) {
        //Banned

        //Send
        _.send({
            client,
            id: "banned",
            channel: message.channel,
            message: `{VAR1} has been ${typeof target === "string" ? "force " : ""}banned!`,
            emoji: "white_check_mark",
            vars: [typeof target === "object" ? target : `<@${target}>`]
        });

        //Badge
        _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Banhammer"
        });

        //Stats
        await _.stats(client, "Bans");
    }
    else _.send({ //missing perms
        client,
        id: typeof target === "object" ? "ban missing perms" : "ban no user",
        channel: message.channel,
        message: typeof target === "object" ? "I don't have permission to ban this user! You can fix this by moving my role above the role of the user you want to ban" : "That user doesn't exist!",
        emoji: "x"
    });
};