module.exports = async (client, oldMessage, newMessage) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Ignore DMs
    if (newMessage.channel.type === "dm") return;

    //Counting
    const channelData = await models.channels.findById(newMessage.channel.id);
    if (channelData.counting) newMessage.delete().catch(() => { });
};