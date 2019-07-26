module.exports = async (client, message, command, cooldown) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Bot use
    _.botUse(client, message);

    //Check if disabled
    if ((command) && (message.channel.data.disabledCommands.includes(command))) return false;

    //Check if cooldown is done
    let cooldownCheck = client.cooldowns.get(message.author.id);
    if ((cooldownCheck) && (cooldownCheck > Date.now())) {

        if (message.guild) _.send({
            client,
            id: "cooldown",
            channel: message.channel,
            message: "You're using my commands too quickly! Gimme another {VAR1} seconds or so to catch a breather!",
            emoji: "x",
            vars: [Math.ceil((cooldownCheck - Date.now()) / 1000)]
        });
        else message.channel.send(`:x:  **|  You're using my commands too quickly! Gimme another ${Math.ceil((cooldownCheck - Date.now()) / 1000)} seconds or so to catch a breather!**`);

        return false;
    }

    //Set cooldown
    if (message.author.id !== client.apixel.id) client.cooldowns.set(message.author.id, Date.now() + cooldown);

    return true;
};