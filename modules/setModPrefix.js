module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Get command params
    let modPrefix = message.content.split(" ").slice(1).join(" ");

    //Over 20 chars
    if (modPrefix.length > 20) return _.send({
        client,
        id: "setmodprefix cant be over 20 chars",
        channel: message.channel,
        message: "The mod prefix can't be more than 20 characters!",
        emoji: "x"
    });

    //Same as prefix
    if (modPrefix === message.guild.data.prefix) return _.send({
        client,
        id: "setmodprefix cant be same as prefix",
        channel: message.channel,
        message: "The mod prefix can't be the same as the prefix!",
        emoji: "x"
    });

    //Set mod prefix
    message.guild.data.modPrefix = modPrefix;

    //Send
    _.send({
        client,
        id: "setmodprefix set",
        channel: message.channel,
        message: "The mod prefix has been set to {VAR1}!",
        emoji: "white_check_mark",
        vars: [modPrefix === "" ? "nothing" : `\`${modPrefix}\``]
    });
};