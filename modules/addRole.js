module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let role = PARAMS.slice(2).join(" ");

    //No user/role specified
    if (target === "") return _.send({
        client,
        id: "addrole no user and role entered",
        channel: message.channel,
        message: "You must specify a user and a role!",
        emoji: "x"
    });

    //No role specified
    if (role === "") return _.send({
        client,
        id: "addrole no role entered",
        channel: message.channel,
        message: "You must specify what role you would like to add!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "addrole no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get role object
    role = _.findRole(message.guild, role);

    //No role
    if (!role) return _.send({
        client,
        id: "addrole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Member already has role
    if (target.roles.has(role.id)) return _.send({
        client,
        id: "addrole member already has role",
        channel: message.channel,
        message: "{VAR1} already has the {VAR2} role!",
        emoji: "x",
        vars: [target, role.name]
    });

    //Position perms
    if (
        (
            (message.member.highestRole.comparePositionTo(target.highestRole) <= 0) ||
            (message.member.highestRole.comparePositionTo(role) <= 0)
        ) &&
        (message.author.id !== message.guild.owner.id)
    ) return _.send({
        client,
        id: "addrole no position perms",
        channel: message.channel,
        message: "You don't have permission to add that role to that user!",
        emoji: "x"
    });

    //Add Role
    let added = await _.promise(target.addRole(role), true);

    if (added) {
        //Added

        //Send
        _.send({
            client,
            id: "addrole role added",
            channel: message.channel,
            message: "{VAR1} now has the {VAR2} role!",
            emoji: "white_check_mark",
            vars: [target, role.name]
        });

        //Stats
        await _.stats(client, "Roles Added");
    }
    else _.send({ //missing perms
        client,
        id: "addrole missing perms",
        channel: message.channel,
        message: "I don't have permission to add that role to that user! Make sure that my role is higher than the role you are trying to add.",
        emoji: "x"
    });
};