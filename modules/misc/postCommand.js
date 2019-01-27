module.exports = async (client, message, command) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Badge check
    if (message.guild) await _.badgeCheck(client, message);

    //Update stats
    if (command) await _.stats(client, command);
};