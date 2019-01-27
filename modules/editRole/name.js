module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //No name
    if (value.length < 1) return _.send({
        client,
        id: "editrole name not enough chars",
        channel: message.channel,
        message: "You must provide a name!",
        emoji: "x"
    });

    //Name cant be over 100 chars
    if (value.length > 100) return _.send({
        client,
        id: "editrole name too many chars",
        channel: message.channel,
        message: "The name can't be more than 100 characters!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setName",
        id: "editrole name",
        message: "The role's name has been set to {VAR1}!",
        vars: [value]
    };
};