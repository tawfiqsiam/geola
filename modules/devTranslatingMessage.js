module.exports = async (client, message) => {

    //Restrict channel
    if (message.channel.id !== client.devTranslating.id) return;

    //Delete message
    message.delete();

    //Not writing message
    if ((!message.author.data.devTranslator) || (!message.author.data.devTranslator.message)) return;

    //Edit
    if (message.author.data.devTranslator.messageType === "edit") client.modules.devTranslating.editMessage(client, message);

    //Reject
    if (message.author.data.devTranslator.messageType === "reject") client.modules.devTranslating.rejectMessage(client, message);

    //Blacklist
    if (message.author.data.devTranslator.messageType === "blacklist") client.modules.devTranslating.blacklistMessage(client, message);
};