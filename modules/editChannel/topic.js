module.exports = async (client, message, value, channel) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (channel.type !== "text") return _.send({
        client,
        id: "editchannel topic not a text channel",
        channel: message.channel,
        message: "That channel isn't a text channel!",
        emoji: "x"
    });

    //Topic cant be over 1024 chars
    if (value.length > 1024) return _.send({
        client,
        id: "editchannel topic too many chars",
        channel: message.channel,
        message: "The topic can't be more than 1024 characters!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setTopic",
        id: value === "" ? "editchannel topic removed" : "editchannel topic",
        message: value === "" ? "The channel's topic has been removed!" : "The channel's topic has been set to {VAR1}!",
        vars: value === "" ? null : [value]
    };
};