module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (value !== "") value = _.findChannel(message.guild, value);

    //No channel
    if ((value !== "") && (!value)) return _.send({
        client,
        id: "editserver afk channel no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Not a voice channel
    if ((value !== "") && (value.type !== "voice")) return _.send({
        client,
        id: "editserver afk channel not a vc",
        channel: message.channel,
        message: "That channel isn't a voice channel!",
        emoji: "x"
    });

    if (value === "") value = null;

    return {
        value,
        action: "setAFKChannel",
        id: !value ? "editserver afk channel removed" : "editserver afk channel",
        message: !value ? "The server's AFK channel has been removed!" : "The server's AFK channel has been set to {VAR1}!",
        vars: !value ? null : [value.name]
    };
};