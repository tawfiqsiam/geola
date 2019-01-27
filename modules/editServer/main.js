module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let setting = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let value = PARAMS.slice(2).join(" ");

    //No setting
    if (setting === "") return _.send({
        client,
        id: "editserver no setting",
        channel: message.channel,
        message: "You must provide a setting to edit!",
        emoji: "x"
    });

    //Parse setting
    const settings = {
        name: ["name", "title"],
        icon: ["icon", "avatar", "profilepicture", "profilepic", "pfp", "picture", "image"],
        region: ["region", "location"],
        afkChannel: ["afkchannel", "afkchan"],
        afkTimeout: ["afktimeout", "afktime", "afkto"],
        newMemberChannel: ["newmemberschannel", "newmemberchannel", "newmemberschan", "newmemberchan", "systemchannel", "systemchan", "membermessages"],
        defaultNotifications: ["defaultnotifications", "defaultnotification", "defaultnotifs", "defaultnotif"],
        verificationLevel: ["verificationlevel", "verificationlvl", "veriflevel", "veriflvl"],
        explicitContentFilter: ["explicitcontentfilter", "expcontentfilter", "contentfilter", "explicitcontent", "expcontent"]
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
        id: "editserver invalid setting",
        channel: message.channel,
        message: "That setting doesn't exist!",
        emoji: "x"
    });

    //Process
    let data = await client.modules.editServer[setting](client, message, value);
    if (data instanceof Discord.Message) return;

    //Reason
    const reasons = [`I was told to do so by ${message.author.username}`, `As per request of ${message.author.username}`, `Some creature who calls itself ${message.author.username} told me to`, `${message.author.username} wanted me to`, `${message.author.username} asked me to and im basically a slave`];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];

    //Edit
    let edited = await _.promise(message.guild[data.action](data.value, reason), true);

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
        id: "editserver missing perms",
        channel: message.channel,
        message: "I don't have enough permissions to do this! I need the Manage Server or Administrator permission",
        emoji: "x"
    });
};