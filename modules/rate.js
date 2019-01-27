module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Rate", 2000)) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No target
    if (!target) return _.send({
        client,
        id: "nothing rate",
        channel: message.channel,
        message: "What would you like me to rate?",
        emoji: "x"
    });

    //Rate
    let rating = Math.floor(Math.random() * 19) + 1 === 1 ? 11 : Math.floor(Math.random() * 9) + 1;

    //Send
    _.send({
        client,
        id: "rate",
        channel: message.channel,
        message: "I'd say that {VAR1} is a {VAR2}",
        emoji: "1234",
        vars: [target, `${rating}/10`]
    });

    //Post command
    await _.postCommand(client, message, "Rate");
};