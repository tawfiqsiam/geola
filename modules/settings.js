module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Send
    _.send({
        client,
        id: "settings",
        channel: message.channel,
        message: "You can access the Dashboard at https://geolabot.com/dashboard",
        emoji: "gear"
    });
};