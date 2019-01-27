module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Send
    _.send({
        client,
        id: "support",
        channel: message.channel,
        message: "You can join my Hub (support server) at https://discord.gg/eCDafVC {VAR1}",
        emoji: "link",
        vars: [client.emojis.get("497632330685349888")] //:PartyParrot:
    });
};