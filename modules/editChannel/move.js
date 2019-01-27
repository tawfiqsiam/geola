module.exports = async (client, message, value, channel) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    let direction = value.toLowerCase().replace(/[^a-z]/g, "");
    let amount = parseInt(value.replace(/[^0-9]/g, ""));
    value = channel.position;

    //Invalid direction
    if (!["up", "down"].includes(direction)) return _.send({
        client,
        id: "editchannel move invalid",
        channel: message.channel,
        message: "You must specify `up` or `down`!",
        emoji: "x"
    });

    //No amount
    if (isNaN(amount)) return _.send({
        client,
        id: "editchannel move no amount",
        channel: message.channel,
        message: "You must specify an amount!",
        emoji: "x"
    });

    //Invalid amount
    if (amount < 1) return _.send({
        client,
        id: "editchannel move amount cant be 0",
        channel: message.channel,
        message: "You must specify an amount above 0!",
        emoji: "x"
    });

    value = direction === "up" ? value - amount : value + amount;

    //Too far up
    if (value < 0) value = 0;

    //Too far down
    if (value > message.guild.channels.size - 1) value = message.guild.channels.size - 1;

    return {
        value: value,
        action: "setPosition",
        id: "editchannel move",
        message: "The channel has been moved!"
    };
};