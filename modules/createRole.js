module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get params
    let name = message.content.split(" ").slice(1).join(" ");

    //No name
    if (name.length === 0) return _.send({
        client,
        id: "createrole no name entered",
        channel: message.channel,
        message: "You must provide a role name!",
        emoji: "x"
    });

    //Name over 100 chars
    if (name.length > 100) return _.send({
        client,
        id: "createrole name too many chars",
        channel: message.channel,
        message: "The role name can't be more than 100 characters!",
        emoji: "x"
    });

    //Create role
    let created = await _.promise(message.guild.createRole({ name }), true);

    if (created) _.send({ //created
        client,
        id: "createrole created",
        channel: message.channel,
        message: "{VAR1} has been created!",
        emoji: "white_check_mark",
        vars: [created.name]
    });
    else _.send({ //missing perms
        client,
        id: "createrole missing perms",
        channel: message.channel,
        message: "I don't have permissions to create roles! I need the Manage Roles or Administrator permission",
        emoji: "x"
    });
};