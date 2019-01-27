module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (value !== "") value = _.findChannel(message.guild, value);

    //No channel
    if ((value !== "") && (!value)) return _.send({
        client,
        id: "editserver system channel no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Not a text channel
    if ((value !== "") && (value.type !== "text")) return _.send({
        client,
        id: "editserver system channel not a text channel",
        channel: message.channel,
        message: "That channel isn't a text channel!",
        emoji: "x"
    });

    if (value === "") value = null;

    return {
        value: value,
        action: "setSystemChannel",
        id: "editserver system channel",
        message: !value ? "The server's New Member Messages channel has been removed!" : "The server's New Member Messages channel has been set to {VAR1}!",
        vars: !value ? null : [value]
    };
};