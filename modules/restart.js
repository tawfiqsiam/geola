module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const errorCheck = require("syntax-error");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    let path = message.content.split(" ").slice(1).join(" ");
    let fullPath = `${__dirname}/${path}.js`;

    //Check if file exists
    const file = await _.checkFile(fullPath);
    if (!file) return message.channel.send(":x:  **|  That file doesn't exist!**");

    //Check if code is valid
    const error = errorCheck(file, fullPath);
    if (error) return message.channel.send(`:x:  **|  Error Compiling:**\n\`\`\`\n${error}\`\`\``);

    //Delete module from cache
    try { delete require.cache[require.resolve(`./${path}`)]; }
    catch (err) { /* */ }

    //Load modules
    client.modules = _.loadModules();

    //Send
    message.channel.send(":white_check_mark:  **|  Restarted module!**");
};