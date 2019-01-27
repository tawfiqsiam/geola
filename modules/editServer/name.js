module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Name cant be under 2 chars
    if (value.length < 2) return _.send({
        client,
        id: "editserver name not enough chars",
        channel: message.channel,
        message: "The name can't be less than 2 characters!",
        emoji: "x"
    });

    //Name cant be over 100 chars
    if (value.length > 100) return _.send({
        client,
        id: "editserver name too many chars",
        channel: message.channel,
        message: "The name can't be more than 100 characters!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setName",
        id: "editserver name",
        message: "The server's name has been set to {VAR1}!",
        vars: [value]
    };
};