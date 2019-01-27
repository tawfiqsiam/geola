module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Get command params
    let prefix = message.content.split(" ").slice(1).join(" ");

    //Over 20 chars
    if (prefix.length > 20) return _.send({
        client,
        id: "setprefix cant be over 20 chars",
        channel: message.channel,
        message: "The prefix can't be more than 20 characters!",
        emoji: "x"
    });

    //Same as mod prefix
    if (prefix === message.guild.data.modPrefix) return _.send({
        client,
        id: "setprefix cant be same as mod prefix",
        channel: message.channel,
        message: "The prefix can't be the same as the mod prefix!",
        emoji: "x"
    });

    //Set prefix
    message.guild.data.prefix = prefix;

    //Send
    _.send({
        client,
        id: "setprefix set",
        channel: message.channel,
        message: "The prefix has been set to {VAR1}!",
        emoji: "white_check_mark",
        vars: [prefix === "" ? "nothing" : `\`${prefix}\``]
    });
};