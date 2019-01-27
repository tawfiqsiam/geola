module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Invalid link
    if ((value !== "") && (!await _.isImage(value))) return _.send({
        client,
        id: "editserver icon invalid",
        channel: message.channel,
        message: "You must provide a valid image link!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setIcon",
        id: "editserver icon",
        message: value === "" ? "The server's icon has been removed!" : "The server's icon has been set!"
    };
};