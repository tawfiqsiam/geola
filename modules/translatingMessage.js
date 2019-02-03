module.exports = async (client, message) => {

    //Restrict channel
    if (message.channel.id !== client.translating.id) return;

    //Delete message
    message.delete();

    //Not writing message
    if ((!message.author.data.verifiedTranslator) || (!message.author.data.verifiedTranslator.message)) return;

    //Edit
    if (message.author.data.verifiedTranslator.messageType === "edit") client.modules.translating.editMessage(client, message);

    //Report
    if (message.author.data.verifiedTranslator.messageType === "report") client.modules.translating.reportMessage(client, message);
};