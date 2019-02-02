module.exports = async (client, reaction, user) => {

    //Pre Module
    const { translating } = client.modules;

    //Restrict channel
    if (reaction.message.channel.id !== client.translating.id) return;

    //Approve
    if (reaction.emoji.name === "✅") translating.approve(client, reaction, user);

    //Edit
    if (reaction.emoji.name === "✏") translating.edit(client, reaction, user);

    //Reject
    if (reaction.emoji.name === "❌") translating.reject(client, reaction, user);

    //Report
    if (reaction.emoji.name === "⚠") translating.report(client, reaction, user);

    //Remove reaction
    reaction.remove(user);
};