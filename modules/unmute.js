module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get command params
    let target = message.content.split(" ").slice(1).join(" ").replace(/[<>@!]/g, "");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "unmute no user entered",
        channel: message.channel,
        message: "You must specify who you want to mute!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "unmute no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get muted role
    let role = message.guild.roles.get(message.guild.data.muteRole);

    //No muted role
    if (!role) return _.send({
        client,
        id: "unmute no muted role",
        channel: message.channel,
        message: "This server doesn't have a Muted role!",
        emoji: "x"
    });

    //User not muted
    if (!target.roles.has(role.id)) return _.send({
        client,
        id: "unmute not muted",
        channel: message.channel,
        message: "{VAR1} isn't muted!",
        emoji: "x",
        vars: [target]
    });

    //Position perms
    if (
        (
            (message.member.highestRole.comparePositionTo(target.highestRole) <= 0) ||
            (message.member.highestRole.comparePositionTo(role) <= 0)
        ) &&
        (message.author.id !== message.guild.owner.id)
    ) return _.send({
        client,
        id: "unmute no position perms",
        channel: message.channel,
        message: "You don't have permission to take the Muted role from that user!",
        emoji: "x"
    });

    //Unmute
    let unmuted = await _.promise(target.removeRole(role), true);

    if (unmuted) {
        //Unmuted

        //Send
        _.send({
            client,
            id: "unmuted",
            channel: message.channel,
            message: "{VAR1} is no longer muted!",
            emoji: "white_check_mark",
            vars: [target]
        });

        //Stats
        _.stats(client, "Unmutes");
    }
    else _.send({ //missing perms
        client,
        id: "unmute missing perms",
        channel: message.channel,
        message: "I don't have permission to unmute that user! Make sure that my role is higher than the target's highest role, and the Muted role.",
        emoji: "x"
    });
};