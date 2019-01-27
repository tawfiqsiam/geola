module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Talk", 2000)) return;

    //Pick a response
    const responses = [
        "ok",
        "lmao",
        "moist",
        "ok lol",
        "idk how to respond",
        "same",
        "or you could just live in the sewers",
        ":ok_hand:",
        "lol",
        "ok mom",
        "why is this a command if its so useless"
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];

    //Send
    message.channel.send(response);


    //Post command
    await _.postCommand(client, message, "Talk");
};