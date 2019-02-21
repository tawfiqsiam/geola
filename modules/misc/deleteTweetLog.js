module.exports = async (client, reaction, user) => {

    //Restrict channel
    if (reaction.message.channel.id !== client.tweets.id) return;

    //Ignore bots
    if (user.bot) return;

    //Delete message
    reaction.message.delete();
};