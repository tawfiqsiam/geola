module.exports = async (client, message, value, role) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/[^a-z]/g, "");

    if (["administrator", "admin", "god", "lord", "overlord"].includes(value)) value = ["ADMINISTRATOR", "Administrator"];
    else if (["createinvite", "createinstantinvite", "invite", "instantinvite"].includes(value)) value = ["CREATE_INSTANT_INVITE", "Create Instant Invite"];
    else if (["kickmembers", "kickusers", "kick"].includes(value)) value = ["KICK_MEMBERS", "Kick Members"];
    else if (["banmembers", "banusers", "ban", "banhammer", "swingbanhammer", "swingthebanhammer"].includes(value)) value = ["BAN_MEMBERS", "Ban Members"];
    else if (["managechannels", "editchannels", "changechannels"].includes(value)) value = ["MANAGE_CHANNELS", "Manage Channels"];
    else if (["manageserver", "editserver", "changeserver", "manageguild", "editguild", "changeguild", "invitebots", "addbots"].includes(value)) value = ["MANAGE_GUILD", "Manage Server"];
    else if (["addreactions", "addnewreactions", "reactions", "react"].includes(value)) value = ["ADD_REACTIONS", "Add Reactions"];
    else if (["viewauditlog", "viewaudits", "auditlog", "audits"].includes(value)) value = ["VIEW_AUDIT_LOG", "View Audit Log"];
    else if (["priorityspeaker", "priority", "importantspeaker"].includes(value)) value = ["PRIORITY_SPEAKER", "Priority Speaker"];
    else if (["readmessages", "readmsgs", "viewchannel", "seechannel", "seemessages", "seemsgs"].includes(value)) value = ["VIEW_CHANNEL", "Read Messages/View Channel"];
    else if (["sendmessages", "sendmsgs", "sendwords"].includes(value)) value = ["SEND_MESSAGES", "Send Messages"];
    else if (["sendttsmessages", "sendttsmsgs", "sendtts", "tts", "ttsmessages", "ttsmsgs"].includes(value)) value = ["SEND_TTS_MESSAGES", "Send TTS Messages"];
    else if (["managemessages", "managemsgs", "pinmessages", "pinmsgs", "pin", "unpinmessages", "unpinmsgs", "unpin", "deletemessages", "deletemsgs"].includes(value)) value = ["MANAGE_MESSAGES", "Manage Messages"];
    else if (["embedlinks", "links", "embed"].includes(value)) value = ["EMBED_LINKS", "Embed Links"];
    else if (["attachfiles", "files", "attach", "attachment", "upload", "uploadfiles", "uploadimages", "uploadimgs", "images", "imgs"].includes(value)) value = ["ATTACH_FILES", "Attach Files"];
    else if (["readmessagehistory", "readmsghistory", "history", "readhistory", "messagehistory", "msghistory"].includes(value)) value = ["READ_MESSAGE_HISTORY", "Read Message History"];
    else if (["mentioneveryone", "mention", "everyone", "tageveryone"].includes(value)) value = ["MENTION_EVERYONE", "Mention Everyone"];
    else if (["useexternalemojis", "useexternalemotes", "externalemojis", "externalemotes", "external", "emojis", "emotes"].includes(value)) value = ["USE_EXTERNAL_EMOJIS", "Use External Emojis"];
    else if (["connect", "connectvc", "vcconnect"].includes(value)) value = ["CONNECT", "Connect"];
    else if (["speak", "talk", "speech"].includes(value)) value = ["SPEAK", "Speak"];
    else if (["mutemembers", "muteusers", "mute"].includes(value)) value = ["MUTE_MEMBERS", "Mute Members"];
    else if (["deafenmembers", "deafenusers", "deafen", "deafmembers", "deafusers", "deaf"].includes(value)) value = ["DEAFEN_MEMBERS", "Deafen Members"];
    else if (["movemembers", "moveusers", "move"].includes(value)) value = ["MOVE_MEMBERS", "Move Members"];
    else if (["usevoiceactivity", "usevoiceactivitydetection", "usevad", "vad", "usepushtotalk", "pushtotalk", "useptt", "ptt"].includes(value)) value = ["USE_VAD", "Use Voice Activity (Push to Talk)"];
    else if (["changenickname", "changenick", "changename"].includes(value)) value = ["CHANGE_NICKNAME", "Change Nickname"];
    else if (["managenicknames", "managenicks", "managenames"].includes(value)) value = ["MANAGE_NICKNAMES", "Manage Nicknames"];
    else if (["manageroles", "editroles", "changeroles"].includes(value)) value = ["MANAGE_ROLES", "Manage Roles"];
    else if (["managewebhooks", "editwebhooks", "changewebhooks", "managewebhookers", "editwebhookers", "changewebhookers"].includes(value)) value = ["MANAGE_WEBHOOKS", "Manage Webhooks"];
    else if (["manageemojis", "editemojis", "changeemojis", "manageemotes", "editemotes", "changeemotes"].includes(value)) value = ["MANAGE_EMOJIS", "Manage Emojis"];
    else return _.send({
        client,
        id: "editrole disable invalid perm",
        channel: message.channel,
        message: "That Permission doesn't exist!",
        emoji: "x"
    });

    //Permission already disabled
    if (!role.hasPermission(value[0], false, false)) return _.send({
        client,
        id: "editrole disable already disabled",
        channel: message.channel,
        message: "That Permission is already disabled!",
        emoji: "x"
    });

    let permission = value[0];
    value[0] = new Discord.Permissions(role.permissions).toArray(false);
    value[0].splice(value[0].indexOf(permission), 1);

    return {
        value: value[0],
        action: "setPermissions",
        id: "editrole disable",
        message: "The role now has the {VAR1} Permission disabled!",
        vars: [value[1]]
    };
};