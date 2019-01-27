module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = parseInt(value);

    if (value === 1) value = [60, "1 minute"];
    else if (value === 5) value = [300, "5 minutes"];
    else if (value === 15) value = [900, "15 minutes"];
    else if (value === 30) value = [1800, "30 minutes"];
    else if (value === 60) value = [3600, "1 hour"];
    else return _.send({
        client,
        id: "editserver afk timeout invalid",
        channel: message.channel,
        message: "The time must be either 1, 5, 15, 30, or 60 (minutes)!",
        emoji: "x"
    });

    return {
        value: value[0],
        action: "setAFKTimeout",
        id: "editserver afk timeout",
        message: "The server's AFK Timeout has been set to {VAR1}!",
        vars: [value[1]]
    };
};