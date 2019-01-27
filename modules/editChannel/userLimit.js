module.exports = async (client, message, value, channel) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (channel.type !== "voice") return _.send({
        client,
        id: "editchannel user limit not a vc",
        channel: message.channel,
        message: "That channel isn't a voice channel!",
        emoji: "x"
    });

    value = value.toLowerCase().replace(/\s+/g, "");

    //Infinity
    if (["", "i", "inf", "infinity", "infinite"].includes(value)) value = 0;

    value = parseInt(value);

    //Invalid user limit
    if (isNaN(value)) return _.send({
        client,
        id: "editchannel user limit not a number",
        channel: message.channel,
        message: "The user limit must be a number!",
        emoji: "x"
    });

    //Cant be less than 0
    if (value < 0) return _.send({
        client,
        id: "editchannel user limit too low",
        channel: message.channel,
        message: "The user limit can't be less 0!",
        emoji: "x"
    });

    //Cant be more than 99
    if (value > 99) return _.send({
        client,
        id: "editchannel user limit too high",
        channel: message.channel,
        message: "The user limit can't be more than 99!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setUserLimit",
        id: value === 0 ? "editchannel user limit infinity" : "editchannel user limit",
        message: value === 0 ? "The channel's user limit has been set to infinity!" : "The channel's user limit has been set to {VAR1}!",
        vars: value === 0 ? null : [value]
    };
};