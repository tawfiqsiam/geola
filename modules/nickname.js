module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let nickname = PARAMS.slice(2).join(" ");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "nickname no user entered",
        channel: message.channel,
        message: "You must specify whose nickname you'd like to change!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "nickname no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Position perms
    if ((message.member.highestRole.comparePositionTo(target.highestRole) < 0) && (message.author.id !== message.guild.owner.id)) return _.send({
        client,
        id: "nickname no position perms",
        channel: message.channel,
        message: "You don't have permission to nickname that user!",
        emoji: "x"
    });

    //Nickname cant be less than 2 chars
    if ((nickname.length < 2) && (nickname !== "")) return _.send({
        client,
        id: "nickname less than 2 chars",
        channel: message.channel,
        message: "The nickname can't be less than 2 characters!",
        emoji: "x"
    });

    //Nickname cant be more than 32 chars
    if (nickname.length > 32) return _.send({
        client,
        id: "nickname more than 32 chars",
        channel: message.channel,
        message: "The nickname can't be more than 32 characters!",
        emoji: "x"
    });

    //Nickname
    let nicknamed = await _.promise(target.setNickname(nickname, `${message.author.tag} asked me to ¯\\_(ツ)_/¯`), true);

    if (nicknamed) {
        //Nicknamed

        //Send
        _.send({
            client,
            id: nickname === "" ? "nickname reset" : "nicknamed",
            channel: message.channel,
            message: nickname === "" ? "{VAR1}'s nickname has been reset!" : "{VAR1}'s nickname is now {VAR2}!",
            emoji: "white_check_mark",
            vars: [target, nickname]
        });

        //Stats
        await _.stats(client, "Nicknames");
    }
    else _.send({ //missing perms
        client,
        id: "nickname missing perms",
        channel: message.channel,
        message: "I don't have permission to nickname this user! You can fix this by moving my role above the role of the user you want to nickname",
        emoji: "x"
    });
};