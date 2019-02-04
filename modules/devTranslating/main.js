module.exports = async (client, reaction, user) => {

    //Pre Module
    const { devTranslating } = client.modules;

    //Restrict channel
    if (reaction.message.channel.id !== client.devTranslating.id) return;

    //Filter out bots
    if (user.bot) return;

    //Approve
    if (reaction.emoji.name === "✅") devTranslating.approve(client, reaction, user);

    //Edit
    if (reaction.emoji.name === "✏") devTranslating.edit(client, reaction, user);

    //Reject
    if (reaction.emoji.name === "❌") devTranslating.reject(client, reaction, user);

    //Blacklist
    if (reaction.emoji.name === "✴") devTranslating.blacklist(client, reaction, user);
};