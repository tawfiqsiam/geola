module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No channel entered
    if (target === "") return _.send({
        client,
        id: "deletechannel no channel entered",
        channel: message.channel,
        message: "You must provide a channel!",
        emoji: "x"
    });

    //Get channel object
    target = _.findChannel(message.guild, target);

    //No channel
    if (!target) return _.send({
        client,
        id: "deletechannel no channel",
        channel: message.channel,
        message: "I couldn't find that channel!",
        emoji: "x"
    });

    //Delete channel
    let deleted = await _.promise(target.delete(), true);

    if (deleted) _.send({ //deleted
        client,
        id: "deletechannel deleted",
        channel: message.channel,
        message: "{VAR1} has been deleted!",
        emoji: "white_check_mark",
        vars: [`${target.type === "text" ? "#" : ""}${target.name}`]
    });
    else _.send({ //missing perms
        client,
        id: "deletechannel missing perms",
        channel: message.channel,
        message: "I don't have permissions to delete channels! I need the Manage Channels or Administrator permission",
        emoji: "x"
    });
};