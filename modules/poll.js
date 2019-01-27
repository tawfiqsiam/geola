module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Poll", 4000)) return;

    //Define emojis
    const pollEmojis = message.guild.data.pollEmojis;
    const emojis = {
        1: (message.guild.emojis.get(pollEmojis["1"]) || pollEmojis["1"]) || "👍",
        2: (message.guild.emojis.get(pollEmojis["2"]) || pollEmojis["2"]) || "🤷",
        3: (message.guild.emojis.get(pollEmojis["3"]) || pollEmojis["3"]) || "👎"
    };

    //React
    await _.promise(message.react(emojis["1"]));
    await _.promise(message.react(emojis["2"]));
    await _.promise(message.react(emojis["3"]));

    //Post command
    await _.postCommand(client, message, "Poll");
};