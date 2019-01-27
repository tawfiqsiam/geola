module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No emoji entered
    if (target === "") return _.send({
        client,
        id: "deleteemoji no role entered",
        channel: message.channel,
        message: "You must provide a emoji!",
        emoji: "x"
    });

    //Get emoji object
    target = _.findEmoji(message.guild, target);

    //No emoji
    if (!target) return _.send({
        client,
        id: "deleteemoji no emoji",
        channel: message.channel,
        message: "I couldn't find that emoji!",
        emoji: "x"
    });

    //Delete emoji
    let deleted = await _.promise(message.guild.deleteEmoji(target), true);

    if (deleted === undefined) _.send({ //deleted
        client,
        id: "deleteemoji deleted",
        channel: message.channel,
        message: "{VAR1} has been deleted!",
        emoji: "white_check_mark",
        vars: [target.name]
    });
    else _.send({ //missing perms
        client,
        id: "deleteemoji missing perms",
        channel: message.channel,
        message: "I don't have permissions to delete emojis! I need the Manage Emojis or Administrator permission",
        emoji: "x"
    });
};