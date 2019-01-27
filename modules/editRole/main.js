module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    //Role name not in "quotes"
    if (message.content.replace(/[^"]/g, "").length !== 2) return _.send({
        client,
        id: "editrole role not in quotes",
        channel: message.channel,
        message: `I couldn't find that role! Make sure the role name is in "quotes"`,
        emoji: "x"
    });

    //Get command params
    const PARAMS = message.content.split(`"`);
    let role = _.findRole(message.guild, PARAMS.slice(1, 2).join(`"`));
    let setting = PARAMS[2].trim().split(" ").slice(0, 1).join(" ").toLowerCase();
    let value = PARAMS[2].trim().split(" ").slice(1).join(" ");

    //No role
    if (!role) return _.send({
        client,
        id: "editrole no role",
        channel: message.channel,
        message: "I couldn't find that role!",
        emoji: "x"
    });

    //No setting
    if (setting === "") return _.send({
        client,
        id: "editrole no setting",
        channel: message.channel,
        message: "You must provide a setting to edit!",
        emoji: "x"
    });

    //Parse setting
    const settings = {
        name: ["name", "title"],
        color: ["color", "colour"],
        hoist: ["hoist", "separate", "separately", "separated"],
        mentionable: ["mentionable", "mention", "tag", "taggable", "ping", "pingable"],
        move: ["move", "position", "place", "placement", "location"],
        enable: ["enable", "on", "turnon", "allow"],
        disable: ["disable", "off", "turnoff", "disallow"]
    };

    let settingValid = false;
    for (let s in settings) if (settings[s].includes(setting)) {
        setting = s;
        settingValid = true;
        break;
    }

    //Invalid setting
    if (!settingValid) return _.send({
        client,
        id: "editrole invalid setting",
        channel: message.channel,
        message: "That setting doesn't exist!",
        emoji: "x"
    });

    //Process
    let data = await client.modules.editRole[setting](client, message, value, role);
    if (data instanceof Discord.Message) return;

    //Reason
    const reasons = [`I was told to do so by ${message.author.username}`, `As per request of ${message.author.username}`, `Some creature who calls itself ${message.author.username} told me to`, `${message.author.username} wanted me to`, `${message.author.username} asked me to and im basically a slave`];
    const reason = data.action === "setPosition" ? false : reasons[Math.floor(Math.random() * reasons.length)];

    //Edit
    let edited = await _.promise(role[data.action](data.value, reason), true);

    if (edited) _.send({ //send
        client,
        id: data.id,
        channel: message.channel,
        message: data.message,
        emoji: "white_check_mark",
        vars: data.vars
    });
    else _.send({ //missing perms
        client,
        id: "editrole missing perms",
        channel: message.channel,
        message: "I don't have enough permissions to do this! I need the Manage Roles or Administrator permission",
        emoji: "x"
    });
};