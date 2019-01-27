module.exports = async (client, message, value, channel) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (channel.type === "voice") return _.send({
        client,
        id: "editchannel name",
        channel: message.channel,
        message: "An NSFW *voice* channel huh? If only that was a thing... ;)",
        emoji: "x"
    });

    if (channel.type !== "text") return _.send({
        client,
        id: "editchannel name",
        channel: message.channel,
        message: "That channel isn't a text channel!",
        emoji: "x"
    });

    value = value.toLowerCase().replace(/\s+/g, "");

    if (["yes", "true"].includes(value)) value = true;
    else if (["no", "false"].includes(value)) value = false;
    else return _.send({
        client,
        id: "editchannel nsfw invalid",
        channel: message.channel,
        message: "You must specify `yes` or `no`!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setNSFW",
        id: value ? "editchannel nsfw on" : "editchannel nsfw off",
        message: value ? "I have a new favorite channel now!" : "Aw man! Fine..."
    };
};