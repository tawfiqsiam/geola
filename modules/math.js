module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const math = require("mathjs");

    //Pre command
    if (!await _.preCommand(client, message, "Math", 2000)) return;

    //Get command params
    let input = message.content.split(" ").slice(1).join(" ");

    //No input
    if (input === "") return _.send({
        client,
        id: "no math",
        channel: message.channel,
        message: "You must provide ~~a pain in the ass~~ some math!",
        emoji: "x"
    });

    //Process
    let output;
    try {
        output = math.eval(input);
    }
    catch (err) {
        let error = err.message.replace(/char/g, "at character");
        return message.channel.send(`:x:  **|  ${error}**`);
    }

    //Send
    message.channel.send(`:1234:  **|  ${output}**`);

    //Post command
    await _.postCommand(client, message, "Math");
};