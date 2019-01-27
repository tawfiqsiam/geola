module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "8 Ball", 2000)) return;

    //Get params
    let asked = message.content.split(" ").slice(1).join(" ") === "" ? false : true;

    //Nothing asked
    if (!asked) return _.send({
        client,
        id: "nothing 8 ball",
        channel: message.channel,
        message: "What's the question?",
        emoji: "x"
    });

    //Pick a response
    let responses = [
        "I think so",
        "Probably not",
        "It would be better if you didn't ask",
        "No, just go outside",
        "NO!",
        "sure why not",
        "Of course!",
        "I don't even care",
        "Hah! You wish!",
        "Hell yeah!"
    ];
    let response = responses[Math.floor(Math.random() * responses.length)];

    //Send
    message.channel.send(`:8ball:  **|  ${response}**`);

    //Post command
    await _.postCommand(client, message, "8 Ball");
};