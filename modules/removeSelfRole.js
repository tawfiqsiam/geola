module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Remove Self Role", 2000)) return;

    //Get params
    let role = message.content.split(" ").slice(1).join(" ");

    //No role specified
    if (role === "") return _.send({
        client,
        id: "removeselfrole no role entered",
        channel: message.channel,
        message: "You must specify a role!",
        emoji: "x"
    });

    //Get role object
    role = _.findRole(message.guild, role);

    //No role
    if (!role) return _.send({
        client,
        id: "removeselfrole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Get self roles
    let selfRole = message.guild.data.selfRoles;

    //Not a self role
    if ((!selfRole) || (!selfRole.includes(role.id))) return _.send({
        client,
        id: "removeselfrole not a self role",
        channel: message.channel,
        message: "That role isn't a Self Role!",
        emoji: "x"
    });

    //User doesn't have role
    if (!message.member.roles.has(role.id)) return _.send({
        client,
        id: "removeselfrole role not added",
        channel: message.channel,
        message: "You don't have the {VAR1} role!",
        emoji: "x",
        vars: [role.name]
    });

    //Remove role
    let removed = await _.promise(message.member.removeRole(role), true);

    if (removed) {
        //Removed

        //Send
        _.send({
            client,
            id: "removeselfrole removed role",
            channel: message.channel,
            message: "You no longer have the {VAR1} role!",
            emoji: "white_check_mark",
            vars: [role.name]
        });

        //Stats
        await _.stats(client, "Self Roles Removed");

        //Post command
        await _.postCommand(client, message);
    }
    else _.send({ //missing perms
        client,
        id: "removeselfrole missing perms",
        channel: message.channel,
        message: "I don't have permission to remove this role from you! Have a moderator fix this by moving my role above the role you want to remove",
        emoji: "x"
    });
};