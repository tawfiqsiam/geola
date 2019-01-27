module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Role", 3000)) return;

    //Get role from param
    let role = message.content.split(" ").slice(1).join(" ").replace(/[<>@&]/g, "");

    //No role specified
    if (role === "") {
        if (message.member.roles.size > 1) role = message.member.highestRole.id;
        else return _.send({
            client,
            id: "role no role entered",
            channel: message.channel,
            message: "You must specify a role!",
            emoji: "x"
        });
    }

    //Get role
    role = _.findRole(message.guild, role);

    //No role found
    if (!role) return _.send({
        client,
        id: "role no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //Check for just ID
    if (message.content.toLowerCase().split(" ")[0].endsWith("roleid")) return message.channel.send(role.id);

    //Types
    let types = [];

    //Administrative
    if (role.hasPermission("ADMINISTRATOR")) types.push("Administrative");

    //Moderative
    if (
        (!role.hasPermission("ADMINISTRATOR")) &&
        ([
            "KICK_MEMBERS",
            "BAN_MEMBERS",
            "MANAGE_CHANNELS",
            "MANAGE_GUILD",
            "PRIORITY_SPEAKER",
            "MANAGE_MESSAGES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MOVE_MEMBERS",
            "MANAGE_NICKNAMES",
            "MANAGE_ROLES",
            "MANAGE_WEBHOOKS",
            "MANAGE_EMOJIS"
        ].some(p => new Discord.Permissions(role.permissions).has(p)))
    ) types.push("Moderative");

    //Autorole
    if ((message.guild.data.get("autoroles")) && (message.guild.data.autoroles.includes(role.id))) types.push("Autorole");

    //Mute Role
    if ((message.guild.data.get("muteRole")) && (message.guild.data.muteRole.includes(role.id))) types.push("Mute Role");

    //Level Reward
    if (
        (message.guild.data.get("levelRewards")) &&
        (message.guild.data.levelRewards.filter(lr => lr.hasOwnProperty("addRoles")).map(lr => lr.addRoles).some(lr => lr.includes(role.id)))
    ) types.push("Level Reward");

    //Position
    let position = message.guild.roles.size - role.calculatedPosition;

    //Permissions
    let perms = new Discord.Permissions(role.permissions).toArray(false);
    let permissions = [];
    perms.forEach(p => {
        if (!["READ_MESSAGES", "EXTERNAL_EMOJIS", "MANAGE_ROLES_OR_PERMISSIONS"].includes(p)) { //deprecated perms
            p = p.replace(/ADMINISTRATOR/g, "ADMIN").replace(/GUILD/g, "SERVER").replace(/VAD/g, "VOICE_ACTIVITY_DETECTION"); //human friendly-i-fy
            p = p.toLowerCase().replace(/_/g, " "); //lowercase and add spaces
            p = `${p.charAt(0).toUpperCase()}${p.slice(1)}`; //title case
            permissions.push(p); //push to perms
        }
    });
    permissions = `${permissions.length > 0 ? `- ${permissions.join("\n- ")}` : "*None*"}\n**Permission Bitfield: ${role.permissions}**`;

    //Embed
    let embed = new Discord.RichEmbed()
        .setTitle(role.name)
        .setDescription(`Role #${position}`)
        .setColor(role.hexColor === "#000000" ? null : role.hexColor)
        .addField("Mentionable", role.mentionable ? "Yup" : "Nop", true)
        .addField("Members", role.members.size, true)
        .addField("Hoisted", role.hoist ? "Yas" : "Nope", true)
        .addField("Hex Color", role.hexColor, true)
        .addField(`Type${types.length === 1 ? "" : "s"}`, `${types.length > 0 ? types.join(", ") : "*Literally None*"}`, true)
        .addField("Base 10 Color", role.color, true)
        .addField("Permissions", permissions)
        .addField("Created On", _.englishDate(role.createdAt))
        .setFooter(`Role ID: ${role.id}`);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Role");
};