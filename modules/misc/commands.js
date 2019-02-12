module.exports = [
    {
        file: "ping",
        name: "Ping",
        access: "everyone",
        inputs: ["ping", "pong"],
        type: "basic",
        usage: "ping"
    },
    {
        file: "help",
        name: "Help",
        access: "everyone",
        inputs: ["help", "halp", "helpme", "helpmepls", "helpmeplease", "commands", "command"],
        type: "basic",
        usage: "ping"
    },
    {
        file: "info",
        name: "Info",
        access: "everyone",
        inputs: ["info", "information"],
        type: "basic",
        usage: "info"
    },
    {
        file: "eightBall",
        name: "8 Ball",
        access: "everyone",
        inputs: ["8ball", "eightball"],
        type: "fun",
        usage: "8ball <Question>"
    },
    {
        file: "rate",
        name: "Rate",
        access: "everyone",
        inputs: ["rate"],
        type: "fun",
        usage: "rate <Text>"
    },
    {
        file: "choose",
        name: "Choose",
        access: "everyone",
        inputs: ["choose", "pick", "select"],
        type: "fun",
        usage: "choose <Option 1, Option 2, Option 3, etc.>"
    },
    {
        file: "reverse",
        name: "Reverse",
        access: "everyone",
        inputs: ["reverse", "flip", "flop"],
        type: "fun",
        usage: "reverse <Text>"
    },
    {
        file: "math",
        name: "Math",
        access: "everyone",
        inputs: ["math", "mathematics"],
        type: "fun",
        usage: "math <Problem>"
    },
    {
        file: "number",
        name: "Number",
        access: "everyone",
        inputs: ["number", "numberfact", "numberinfo", "numberinformation"],
        type: "fun",
        usage: "number <Number>"
    },
    {
        file: "npm",
        name: "NPM",
        access: "everyone",
        inputs: ["npm", "nodepackagemanager", "nodejspackagemanager"],
        type: "fun",
        usage: "npm <Package>"
    },
    {
        file: "djs",
        name: "D.JS",
        access: "everyone",
        inputs: ["djs", "d.js", "discordjs", "discord.js"],
        type: "fun",
        usage: "djs <Search Query>"
    },
    {
        file: "invite",
        name: "Invite",
        access: "everyone",
        inputs: ["invite"],
        type: "basic",
        usage: "invite",
        noToggle: true
    },
    {
        file: "support",
        name: "Support",
        access: "everyone",
        inputs: ["support"],
        type: "basic",
        usage: "support",
        noToggle: true
    },
    {
        file: "weather",
        name: "Weather",
        access: "everyone",
        inputs: ["weather", "temp", "temperature"],
        type: "fun",
        usage: "weather <Location>"
    },
    {
        file: "mods",
        name: "Mods",
        access: "everyone",
        inputs: ["mods", "moderators", "admins", "administrators"],
        type: "basic",
        usage: "mods"
    },
    {
        file: "server",
        name: "Server",
        access: "everyone",
        inputs: ["server", "guild", "serverid", "guildid"],
        type: "basic",
        usage: "server [Server ID]"
    },
    {
        file: "channel",
        name: "Channel",
        access: "everyone",
        inputs: ["channel", "chan", "channelid", "chanid"],
        type: "basic",
        usage: "channel [Channel]"
    },
    {
        file: "role",
        name: "Role",
        access: "everyone",
        inputs: ["role", "roleid"],
        type: "basic",
        usage: "role [Role]"
    },
    {
        file: "user",
        name: "User",
        access: "everyone",
        inputs: ["user", "userid"],
        type: "basic",
        usage: "user [User]"
    },
    {
        file: "emoji",
        name: "Emoji",
        access: "everyone",
        inputs: ["emoji", "emojiid", "emojid"],
        type: "basic",
        usage: "emoji <Emoji>"
    },
    {
        file: "kick",
        name: "Kick",
        access: "mod",
        inputs: ["kick", "boot"],
        type: "mod",
        usage: "kick <User> [Reason]"
    },
    {
        file: "ban",
        name: "Ban",
        access: "mod",
        inputs: ["ban", "banhammer"],
        type: "mod",
        usage: "ban <User> [Reason]"
    },
    {
        file: "unban",
        name: "Unban",
        access: "mod",
        inputs: ["unban", "unbanhammer"],
        type: "mod",
        usage: "unban <User> [Reason]"
    },
    {
        file: "prune",
        name: "Prune",
        access: "mod",
        inputs: ["prune", "purge"],
        type: "mod",
        usage: "prune <Amount>"
    },
    {
        file: "nickname",
        name: "Nickname",
        access: "mod",
        inputs: ["nickname", "nick"],
        type: "mod",
        usage: "nickname <User> [Nickname]"
    },
    {
        file: "addRole",
        name: "Add Role",
        access: "mod",
        inputs: ["addrole", "roleadd"],
        type: "mod",
        usage: "addrole <User> <Role>"
    },
    {
        file: "removeRole",
        name: "Remove Role",
        access: "mod",
        inputs: ["removerole", "roleremove"],
        type: "mod",
        usage: "removerole <User> <Role>"
    },
    {
        file: "addTemporaryRole",
        name: "Add Temporary Role",
        access: "mod",
        inputs: ["addtemporaryrole", "addtemprole", "addtrole"],
        type: "mod",
        usage: "addtrole <User> <Time> <Role>"
    },
    {
        file: "removeTemporaryRole",
        name: "Remove Temporary Role",
        access: "mod",
        inputs: ["removetemporaryrole", "removetemprole", "removetrole"],
        type: "mod",
        usage: "removetrole <User> <Time> <Role>"
    },
    {
        file: "warn",
        name: "Warn",
        access: "mod",
        inputs: ["warn", "givewarn", "givewarning", "addwarn", "addwarning"],
        type: "mod",
        usage: "warn <User> [Reason]"
    },
    {
        file: "unwarn",
        name: "Unwarn",
        access: "mod",
        inputs: ["unwarn", "takewarn", "takewarning", "removewarn", "removewarning"],
        type: "mod",
        usage: "unwarn <User> [Reason]"
    },
    {
        file: "mute",
        name: "Mute",
        access: "mod",
        inputs: ["mute"],
        type: "mod",
        usage: "mute <User>"
    },
    {
        file: "unmute",
        name: "Unmute",
        access: "mod",
        inputs: ["unmute"],
        type: "mod",
        usage: "unmute <User>"
    },
    {
        file: "addItem",
        name: "Add Item",
        access: "mod",
        inputs: ["additem", "giveitem"],
        type: "mod",
        usage: "additem <User> [Amount] <Item>"
    },
    {
        file: "removeItem",
        name: "Remove Item",
        access: "mod",
        inputs: ["removeitem", "takeitem"],
        type: "mod",
        usage: "removeitem <User> [Amount] <Item>"
    },
    {
        file: "createChannel",
        name: "Create Channel",
        access: "mod",
        inputs: ["createchannel", "createchan", "makechannel", "makechan", "channelcreate", "chancreate", "channelmake", "chanmake"],
        type: "mod",
        usage: "createchannel <Type> <Name> [Clone]"
    },
    {
        file: "deleteChannel",
        name: "Delete Channel",
        access: "mod",
        inputs: ["deletechannel", "deletechan", "channeldelete", "chandelete"],
        type: "mod",
        usage: "deletechannel <Channel>"
    },
    {
        file: "createRole",
        name: "Create Role",
        access: "mod",
        inputs: ["createrole", "makerole", "rolecreate", "rolemake"],
        type: "mod",
        usage: "createrole <Name>"
    },
    {
        file: "deleteRole",
        name: "Delete Role",
        access: "mod",
        inputs: ["deleterole", "roledelete"],
        type: "mod",
        usage: "deleterole <Role>"
    },
    {
        file: "createEmoji",
        name: "Create Emoji",
        access: "mod",
        inputs: ["createemoji", "createmoji", "makeemoji", "makemoji", "emojicreate", "emojimake"],
        type: "mod",
        usage: "createemoji <Name> <Source>"
    },
    {
        file: "deleteEmoji",
        name: "Delete Emoji",
        access: "mod",
        inputs: ["deleteemoji", "deletemoji", "emojidelete"],
        type: "mod",
        usage: "deleteemoji <Emoji>"
    },
    {
        file: "stealEmoji",
        name: "Steal Emoji",
        access: "everyone",
        inputs: ["stealemoji", "robemoji", "emojisteal", "emojirob"],
        type: "fun",
        usage: "stealemoji <Emoji> <Server>"
    },
    {
        file: "editServer",
        name: "Edit Server",
        access: "mod",
        inputs: ["editserver", "editguild", "serveredit", "guildedit"],
        type: "mod",
        usage: "editserver <Setting> <Value>"
    },
    {
        file: "editChannel",
        name: "Edit Channel",
        access: "mod",
        inputs: ["editchannel", "editchan", "channeledit", "chanedit"],
        type: "mod",
        usage: `editchannel <Text Channel | "Voice Channel"> <Setting> <Value>`
    },
    {
        file: "editRole",
        name: "Edit Role",
        access: "mod",
        inputs: ["editrole", "roleedit"],
        type: "mod",
        usage: "editrole <Role> <Setting> <Value>"
    },
    {
        file: "trello",
        name: "Trello",
        access: "everyone",
        inputs: ["trello"],
        type: "fun",
        usage: "trello <Type> <Info>"
    },
    {
        file: "youtube",
        name: "YouTube",
        access: "everyone",
        inputs: ["youtube", "yt", "youtubesearch", "ytsearch", "searchyoutube", "searchyt"],
        type: "fun",
        usage: "youtube <Search Query>"
    },
    {
        file: "imgur",
        name: "Imgur",
        access: "everyone",
        inputs: ["imgur", "imgursearch"],
        type: "fun",
        usage: "imgur <Search Query | Image>"
    },
    {
        file: "leaderboard",
        name: "Leaderboard",
        access: "everyone",
        inputs: ["leaderboard", "lb"],
        type: "basic",
        usage: "lb [Page] [Bot] [Type]"
    },
    {
        file: "globalLeaderboard",
        name: "Global Leaderboard",
        access: "everyone",
        inputs: ["globalleaderboard", "glb"],
        type: "basic",
        usage: "glb [Page] [Bot] [Type]"
    },
    {
        file: "profile",
        name: "Profile",
        access: "everyone",
        inputs: ["profile", "p"],
        type: "basic",
        usage: "p [User]"
    },
    {
        file: "globalProfile",
        name: "Global Profile",
        access: "everyone",
        inputs: ["globalprofile", "gp"],
        type: "basic",
        usage: "gp [User]"
    },
    {
        file: "poll",
        name: "Poll",
        access: "everyone",
        inputs: ["poll"],
        type: "fun",
        usage: "poll: <Question>",
        noPrefix: true
    },
    {
        file: "talk",
        name: "Talk",
        access: "everyone",
        inputs: [],
        type: "fun",
        usage: "<@298920361548840960> <Words>",
        noPrefix: true
    },
    {
        file: "reputation",
        name: "Reputation",
        access: "everyone",
        inputs: ["reputation", "rep"],
        type: "misc",
        usage: "rep <User>"
    },
    {
        file: "warnings",
        name: "Warnings",
        access: "everyone",
        inputs: ["warnings", "warns"],
        type: "basic",
        usage: "warns [Page] [User]"
    },
    {
        file: "addSelfRole",
        name: "Add Self Role",
        access: "everyone",
        inputs: ["addrole", "addselfrole"],
        type: "basic",
        usage: "addrole <Role>"
    },
    {
        file: "removeSelfRole",
        name: "Remove Self Role",
        access: "everyone",
        inputs: ["removerole", "removeselfrole"],
        type: "basic",
        usage: "removerole <Role>"
    },
    {
        file: "shop",
        name: "Shop",
        access: "everyone",
        inputs: ["shop", "shopitems"],
        type: "basic",
        usage: "shop <Shop>"
    },
    {
        file: "buy",
        name: "Buy",
        access: "everyone",
        inputs: ["buy", "purchase"],
        type: "basic",
        usage: `buy <Amount> "<Item>" <Shop>`
    },
    {
        file: "sell",
        name: "Sell",
        access: "everyone",
        inputs: ["sell", "unpurchase"],
        type: "basic",
        usage: `sell <Amount> "<Item>" <Shop>`
    },
    {
        file: "react",
        name: "React",
        access: "everyone",
        inputs: ["react", "reaction", "addreact", "addreaction"],
        type: "fun",
        usage: "react <Emoji> [Channel <Message ID>]"
    },
    {
        file: "say",
        name: "Say",
        access: "everyone",
        inputs: ["say", "sayto"],
        type: "fun",
        usage: "say[to <Channel>] <Text>"
    },
    {
        file: "sayEmbed",
        name: "Say Embed",
        access: "everyone",
        inputs: ["sayembed", "sayembedto"],
        type: "fun",
        usage: "sayembed[to <Channel>] <Embed Information | Text>"
    },
    {
        file: "inventory",
        name: "Inventory",
        access: "everyone",
        inputs: ["inventory", "inv", "items"],
        type: "basic",
        usage: "inv [Page] [User]"
    },
    {
        file: "globalInventory",
        name: "Global Inventory",
        access: "everyone",
        inputs: ["globalinventory", "globalinv", "ginv", "globalitems"],
        type: "basic",
        usage: "ginv [Page] [User]"
    },
    {
        file: "badgeAlerts",
        name: "Badge Alerts",
        access: "everyone",
        inputs: ["badgealerts"],
        type: "misc",
        usage: "badgealerts <Enable | Disable>",
        noToggle: true
    },
    {
        file: "settings",
        name: "Settings",
        access: "mod",
        inputs: ["settings", "dashboard", "editsettings"],
        type: "mod",
        usage: "settings"
    },
    {
        file: "setPrefix",
        name: "Set Prefix",
        access: "mod",
        inputs: ["prefix", "setprefix", "editprefix"],
        type: "mod",
        usage: "prefix <Prefix>"
    },
    {
        file: "setModPrefix",
        name: "Set Mod Prefix",
        access: "mod",
        inputs: ["modprefix", "setmodprefix", "editmodprefix"],
        type: "mod",
        usage: "modprefix <Mod Prefix>"
    },
    {
        file: "setLanguage",
        name: "Set Language",
        access: "mod",
        inputs: ["language", "setlanguage", "editlanguage", "lang", "setlang", "editlang"],
        type: "mod",
        usage: "language <Language> [Channel]"
    },
    {
        file: "resetTimedAnnouncement",
        name: "Reset Timed Announcement",
        access: "mod",
        inputs: ["resettimedannouncement", "resetta", "resettimeda", "resettannouncement", "timedannouncementreset", "tareset", "timedareset", "tannouncementreset"],
        type: "mod",
        usage: "resetta [Send]"
    },
    {
        file: "eval",
        name: "Eval",
        access: "owner",
        inputs: ["eval"],
        type: "owner",
        usage: "eval <Code>"
    },
    {
        file: "restart",
        name: "Restart",
        access: "owner",
        inputs: ["restart"],
        type: "owner",
        usage: "restart <Path>"
    },
    {
        file: "dbquery",
        name: "DB Query",
        access: "owner",
        inputs: ["dbquery"],
        type: "owner",
        usage: "dbquery <Model> <Conditions>"
    },
    {
        file: "requery",
        name: "Requery",
        access: "owner",
        inputs: ["requery"],
        type: "owner",
        usage: "requery"
    },
    {
        file: "execute",
        name: "Execute",
        access: "owner",
        inputs: ["execute", "exec"],
        type: "owner",
        usage: "execute <Command>"
    },
    {
        file: "badge",
        name: "Badge",
        access: "owner",
        inputs: ["badge"],
        type: "owner",
        usage: "badge <Add | Remove> <User> <Badge>"
    },
    {
        file: "blacklist",
        name: "Blacklist",
        access: "owner",
        inputs: ["blacklist", "bl"],
        type: "owner",
        usage: "bl <Type> <User | Server ID> [Cooldown (Hours)] <Reason>"
    },
    {
        file: "unblacklist",
        name: "Unblacklist",
        access: "owner",
        inputs: ["unblacklist", "unbl", "ubl"],
        type: "owner",
        usage: "ubl <Type> <User | Server ID>"
    },
    {
        file: "verify",
        name: "Verify",
        access: "owner",
        inputs: ["verify", "verif"],
        type: "owner",
        usage: "verify <Type> <User | Server ID>"
    },
    {
        file: "unverify",
        name: "Unverify",
        access: "owner",
        inputs: ["unverify", "unverif", "uverif"],
        type: "owner",
        usage: "unverify <Type> <User | Server ID>"
    },
    {
        file: "globalBan",
        name: "Global Ban",
        access: "owner",
        inputs: ["globalban", "gb"],
        type: "owner",
        usage: "globalban <Add | Remove> <User> <Reason (Add)>"
    },
    {
        file: "vars",
        name: "Variables",
        access: "owner",
        inputs: ["vars", "variables"],
        type: "owner",
        usage: "vars <Phrase>"
    },
    {
        file: "setVar",
        name: "Set Variable",
        access: "owner",
        inputs: ["setvar", "setvariable", "varset", "variableset", "var"],
        type: "owner",
        usage: `setvar <"Phrase"> <Number> <Text>`
    },
    {
        file: "backup",
        name: "Backup",
        access: "owner",
        inputs: ["backup", "back"],
        type: "owner",
        usage: "backup"
    }
];