module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //Pre command
    if (!await _.preCommand(client, message, "DJS", 3000)) return;

    //Get command params
    let query = message.content.split(" ").slice(1).join(" ").replace(/#/g, ".");

    //No query
    if (query === "") return _.send({
        client,
        id: "djs nothing searched",
        channel: message.channel,
        message: "What would you like to search?",
        emoji: "x"
    });

    //Fetch
    let data = await fetch(`https://djsdocs.sorta.moe/main/stable/embed?q=${query}`);
    data = await data.json();

    //No results
    if (!data) return _.send({
        client,
        id: "djs no results",
        channel: message.channel,
        message: "I couldn't find anything on the D.JS docs for that search!",
        emoji: "x"
    });

    //Send
    message.channel.send({ embed: data });

    //Post command
    await _.postCommand(client, message, "DJS");
};