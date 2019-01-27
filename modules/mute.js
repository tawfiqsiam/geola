module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Get command params
    let target = message.content.split(" ").slice(1).join(" ").replace(/[<>@!]/g, "");

    //No user specified
    if (target === "") return _.send({
        client,
        id: "mute no user entered",
        channel: message.channel,
        message: "You must specify who you want to mute!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "mute no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get muted role
    let role = message.guild.roles.get(message.guild.data.muteRole); //from db
    if (!role) role = message.guild.roles.find(r => r.name.toLowerCase().replace(/\s+/g, "") === "muted"); //by name
    if (!role) { //create one

        //Missing perms
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return _.send({
            client,
            id: "mute missing perms to make role",
            channel: message.channel,
            message: "A Muted role doesn't exist and I don't have permission to create a new one!",
            emoji: "x"
        });

        //Create role
        role = await message.guild.createRole({
            name: "Muted",
            color: 0x010101,
            permissions: [],
            mentionable: false,
            hoist: false,
            position: message.guild.me.highestRole.position - 1
        });

        //Set channel perms
        message.guild.channels.array().forEach(c => c.overwritePermissions(role, { SEND_MESSAGES: false }));
    }

    //Add muted role to DB
    message.guild.data.muteRole = role.id;

    //User already muted
    if (target.roles.has(role.id)) return _.send({
        client,
        id: "mute already muted",
        channel: message.channel,
        message: "{VAR1} is already muted!",
        emoji: "x",
        vars: [target]
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
        id: "mute no position perms",
        channel: message.channel,
        message: "You don't have permission to give the Muted role to that user!",
        emoji: "x"
    });

    //Mute
    let muted = await _.promise(target.addRole(role), true);

    if (muted) {
        //Muted

        //Send
        _.send({
            client,
            id: "muted",
            channel: message.channel,
            message: "{VAR1} has been muted!",
            emoji: "white_check_mark",
            vars: [target]
        });

        //Stats
        _.stats(client, "Mutes");
    }
    else _.send({ //missing perms
        client,
        id: "mute missing perms",
        channel: message.channel,
        message: "I don't have permission to mute that user! Make sure that my role is higher than the target's highest role, and the Muted role.",
        emoji: "x"
    });
};