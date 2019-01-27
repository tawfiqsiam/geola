module.exports = async (client, message) => {

    //Pre Module
    const { Discord, mongoose, chalk, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Command", 3000)) return;

    //code

    //Post command
    await _.postCommand(client, message, "Command");
};