module.exports = async (client, message, value, channel) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    if (channel.type !== "voice") return _.send({
        client,
        id: "editchannel bitrate not a vc",
        channel: message.channel,
        message: "That channel isn't a voice channel!",
        emoji: "x"
    });

    let isDefault = false;

    if (value !== "") { //not default

        value = parseInt(value);

        //Invalid bitrate
        if (isNaN(value)) return _.send({
            client,
            id: "editchannel bitrate not a number",
            channel: message.channel,
            message: "The bitrate must be a number!",
            emoji: "x"
        });

        //Cant be less than 8
        if (value < 8) return _.send({
            client,
            id: "editchannel bitrate too low",
            channel: message.channel,
            message: "The bitrate can't be less than 8kbps!",
            emoji: "x"
        });

        //Cant be more than 96
        if (value > 96) return _.send({
            client,
            id: "editchannel bitrate too high",
            channel: message.channel,
            message: "The bitrate can't be more than 96kbps!",
            emoji: "x"
        });
    }
    else { //default

        isDefault = true;

        value = 64;
    }

    return {
        value: value,
        action: "setBitrate",
        id: isDefault ? "editchannel bitrate reset" : "editchannel bitrate",
        message: isDefault ? "The channel's bitrate has been set to its default (64kbps)!" : "The channel's bitrate has been set to {VAR1}kbps!",
        vars: isDefault ? null : [value]
    };
};