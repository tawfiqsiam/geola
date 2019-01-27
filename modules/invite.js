module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Send
    _.send({
        client,
        id: "invite",
        channel: message.channel,
        message: "You can add me at http://geolabot.com/invite {VAR1}",
        emoji: "link",
        vars: [client.emojis.get("512802827274551296")] //:BlobPartyNeon:
    });
};