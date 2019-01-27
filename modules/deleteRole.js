module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get params
    let target = message.content.split(" ").slice(1).join(" ");

    //No role entered
    if (target === "") return _.send({
        client,
        id: "deleterole no role entered",
        channel: message.channel,
        message: "You must provide a role!",
        emoji: "x"
    });

    //Get role object
    target = _.findRole(message.guild, target);

    //No role
    if (!target) return _.send({
        client,
        id: "deleterole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Delete role
    let deleted = await _.promise(target.delete(), true);

    if (deleted) _.send({ //deleted
        client,
        id: "deleterole deleted",
        channel: message.channel,
        message: "{VAR1} has been deleted!",
        emoji: "white_check_mark",
        vars: [target.name]
    });
    else _.send({ //missing perms
        client,
        id: "deleterole missing perms",
        channel: message.channel,
        message: "I don't have permissions to deleted roles! I need the Manage Roles or Administrator permission",
        emoji: "x"
    });
};