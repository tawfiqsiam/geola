module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("KICK_MEMBERS")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let reason = PARAMS.slice(2).join(" ");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "kick no user entered",
        channel: message.channel,
        message: "You must specify who you want to kick!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "kick no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Position perms
    if ((message.member.highestRole.comparePositionTo(target.highestRole) < 0) && (message.author.id !== message.guild.owner.id)) return _.send({
        client,
        id: "kick no position perms",
        channel: message.channel,
        message: "You don't have permission to kick that user!",
        emoji: "x"
    });

    //Kick
    let kicked = await _.promise(target.kick(reason), true);

    if (kicked) {
        //Kicked

        //Send
        _.send({
            client,
            id: "kicked",
            channel: message.channel,
            message: "{VAR1} has been kicked!",
            emoji: "white_check_mark",
            vars: [target]
        });

        //Badge
        _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Boot"
        });

        //Stats
        await _.stats(client, "Kicks");
    }
    else _.send({ //missing perms
        client,
        id: "kick missing perms",
        channel: message.channel,
        message: "I don't have permission to kick this user! You can fix this by moving my role above the role of the user you want to kick",
        emoji: "x"
    });
};