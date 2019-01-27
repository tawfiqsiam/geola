module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Choose", 2000)) return;

    //Get + parse choices
    let choices = message.content.split(" ").slice(1).join(" ").split(",");
    choices.forEach((c, i) => choices[i] = c.trim());

    //No choices
    if (choices[0] === "") return _.send({
        client,
        id: "nothing choose",
        channel: message.channel,
        message: "What would you like me to choose between?",
        emoji: "x"
    });

    //Only one choice
    if (choices.length === 1) return _.send({
        client,
        id: "only 1 choose",
        channel: message.channel,
        message: "How am I supposed to choose between just one thing? {VAR1}",
        emoji: "x",
        vars: [client.emojis.get("497632335269986314")] //:thinkasdf:
    });

    //Choose
    let choice = choices[Math.floor(Math.random() * choices.length)];

    //Send
    _.send({
        client,
        id: "choose",
        channel: message.channel,
        message: "I'd prefer {VAR1}",
        emoji: "thinking",
        vars: [choice]
    });

    //Post command
    await _.postCommand(client, message, "Choose");
};