module.exports = async (client, message, value, role) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    let direction = value.toLowerCase().replace(/[^a-z]/g, "");
    let amount = parseInt(value.toLowerCase().replace(/[^0-9]/g, ""));
    value = role.position;

    //Invalid direction
    if (!["up", "down"].includes(direction)) return _.send({
        client,
        id: "editrole move invalid",
        channel: message.channel,
        message: "You must specify `up` or `down`!",
        emoji: "x"
    });

    //No amount
    if (isNaN(amount)) return _.send({
        client,
        id: "editrole move no amount",
        channel: message.channel,
        message: "You must specify an amount!",
        emoji: "x"
    });

    //Invalid amount
    if (amount < 1) return _.send({
        client,
        id: "editrole move amount cant be 0",
        channel: message.channel,
        message: "You must specify an amount above 0!",
        emoji: "x"
    });

    value = direction === "up" ? value + amount : value - amount;

    //Too far up
    if (value < 1) value = 1;

    //Too far down
    if (value > message.guild.roles.size - 1) value = message.guild.roles.size - 1;

    //Role too high
    if (role.position >= message.guild.me.highestRole.position) return _.send({
        client,
        id: "editrole move role is higher",
        channel: message.channel,
        message: "I don't have permission to do this because the role is higher than my highest role! Blame Discord",
        emoji: "x"
    });

    //Role would be too high
    if (value >= message.guild.me.highestRole.position) return _.send({
        client,
        id: "editrole move role would be higher",
        channel: message.channel,
        message: "I don't have permission to do this because this move would cause the role to be higher than my highest role! Blame Discord",
        emoji: "x"
    });

    return {
        value: value,
        action: "setPosition",
        id: "editrole move",
        message: "The role has been moved!"
    };
};