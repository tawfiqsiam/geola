module.exports = async (client, message) => {

    //Restrict channel
    if (message.channel.id !== client.tweets.id) return;

    //Ignore bots
    if (message.author.bot) return;

    //Delete message
    message.delete();
};