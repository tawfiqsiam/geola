module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let time = PARAMS.slice(2, 3).join(" ").toLowerCase();
    let role = PARAMS.slice(3).join(" ");

    //No user/time/role specified
    if (target === "") return _.send({
        client,
        id: "removetemprole no user, time, and role entered",
        channel: message.channel,
        message: "You must specify a user, time, and role!",
        emoji: "x"
    });

    //No time/role specified
    if (time === "") return _.send({
        client,
        id: "removetemprole no time and role entered",
        channel: message.channel,
        message: "You must specify a time and role!",
        emoji: "x"
    });

    //No role specified
    if (role === "") return _.send({
        client,
        id: "removetemprole no role entered",
        channel: message.channel,
        message: "You must specify what role you would like to remove!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "removetemprole no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get role object
    role = _.findRole(message.guild, role);

    //No role
    if (!role) return _.send({
        client,
        id: "removetemprole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Parse time
    let times = time
        .replace(/h/g, "h ")
        .replace(/m/g, "m ")
        .replace(/s/g, "s ")
        .replace(/d/g, "d ")
        .replace(/w/g, "w ")
        .split(" ");
    times.splice(times.length - 1, 1);
    time = 0;

    times.forEach(t => {

        let type = t.replace(/[0-9]/g, "");
        let amount = parseInt(t.replace(/[^0-9]/g, ""));
        let timeValue = {
            h: 3600000,
            m: 60000,
            s: 1000,
            d: 86400000,
            w: 604800000
        }[type];

        if (isNaN(amount)) amount = 1;

        time = time + (amount * timeValue);
    });

    //Time is over 30 days
    if (time > 2592000000) return _.send({
        client,
        id: "removetemprole time too high",
        channel: message.channel,
        message: "The time can't be more than 30 days!",
        emoji: "x"
    });

    //Member doesnt have role
    if (!target.roles.has(role.id)) return _.send({
        client,
        id: "removetemprole member doesnt have role",
        channel: message.channel,
        message: "{VAR1} doesn't have the {VAR2} role!",
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
        id: "removetemprole no position perms",
        channel: message.channel,
        message: "You don't have permission to remove that role from that user!",
        emoji: "x"
    });

    //Remove Role
    let removed = await _.promise(target.removeRole(role), true);

    if (removed) {
        //Removed

        //Add to temp roles
        message.guild.data.temporaryRoles.push({
            action: "add",
            role: role.id,
            member: target.id,
            timestamp: Date.now() + time
        });

        //Send
        _.send({
            client,
            id: "removetemprole role removed",
            channel: message.channel,
            message: "{VAR1} no longer has the {VAR2} role!",
            emoji: "white_check_mark",
            vars: [target, role.name]
        });

        //Stats
        await _.stats(client, "Temporary Roles Removed");
    }
    else _.send({ //missing perms
        client,
        id: "removetemprole missing perms",
        channel: message.channel,
        message: "I don't have permission to remove that role from that user! Make sure that my role is higher than the role you are trying to remove.",
        emoji: "x"
    });
};