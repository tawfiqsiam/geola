module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Add Self Role", 2000)) return;

    //Get params
    let role = message.content.split(" ").slice(1).join(" ");

    //No role specified
    if (role === "") return _.send({
        client,
        id: "addselfrole no role entered",
        channel: message.channel,
        message: "You must specify a role!",
        emoji: "x"
    });

    //Get role object
    role = _.findRole(message.guild, role);

    //No role
    if (!role) return _.send({
        client,
        id: "addselfrole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Get self roles
    let selfRole = message.guild.data.selfRoles;

    //Not a self role
    if ((!selfRole) || (!selfRole.includes(role.id))) return _.send({
        client,
        id: "addselfrole not a self role",
        channel: message.channel,
        message: "That role isn't a Self Role!",
        emoji: "x"
    });

    //User already has role
    if (message.member.roles.has(role.id)) return _.send({
        client,
        id: "addselfrole role already added",
        channel: message.channel,
        message: "You already have the {VAR1} role!",
        emoji: "x",
        vars: [role.name]
    });

    //Add role
    let added = await _.promise(message.member.addRole(role), true);

    if (added) {
        //Added

        //Send
        _.send({
            client,
            id: "addselfrole added",
            channel: message.channel,
            message: "You now have the {VAR1} role!",
            emoji: "white_check_mark",
            vars: [role.name]
        });

        //Stats
        await _.stats(client, "Self Roles Added");

        //Post command
        await _.postCommand(client, message);
    }
    else _.send({ //missing perms
        client,
        id: "addselfrole missing perms",
        channel: message.channel,
        message: "I don't have permission to add this role to you! Have a moderator fix this by moving my role above the role you want to add",
        emoji: "x"
    });
};