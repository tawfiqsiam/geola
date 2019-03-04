module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, message.guild && "Help", 2000)) return;

    //Get params
    let type = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    //Parse type
    if (["basic", "informational", "basiccommands", "informationalcommands", "basicinformational", "basicinformationalcommands", "main"].includes(type)) type = "basic";
    else if (["fun", "funcommands"].includes(type)) type = "fun";
    else if (["mod", "moderator", "modcommands", "moderatorcommands"].includes(type)) type = "mod";
    else if (["misc", "miscellaneous", "misccommands", "miscellaneouscommands"].includes(type)) type = "misc";
    else if (["features", "botfeatures", "geola", "geolafeatures"].includes(type)) type = "features";
    else if (["owner", "ownercommands", "dev", "devcommands", "developer", "developercommands"].includes(type)) type = "owner";
    else type = "";

    //Get settings
    const prefix = (message.guild && message.guild.data.prefix) || "g!";
    const modPrefix = (message.guild && message.guild.data.modPrefix) || "g@";
    const isDev = await _.isDev(client, message.author);

    //Not a dev
    if ((type === "owner") && (!isDev)) {
        if (message.guild) _.send({
            client,
            id: "help not a dev",
            channel: message.channel,
            message: "I'm pretty sure you're not a developer {VAR1}",
            emoji: "x",
            vars: [client.emojis.get("526855407478767636")] //:thinkasdfghjkl:
        });

        return;
    }

    //Get commands
    const { commands } = _;
    let contentType = "Commands";
    let content = commands.filter(c => c.type === type).map(c => `**${c.name}:** ${c.noPrefix ? "" : { everyone: prefix, mod: modPrefix, owner: "g#" }[c.access]}${c.usage}`).join("\n");

    if (type === "") {
        contentType = "Modules";
        content = `\u2022Basic\n\u2022Fun\n\u2022Mod\n\u2022Misc\n\u2022Bot Features${isDev ? "\n\u2022Owner" : ""}`;
    }

    if (type === "features") content = "\u2022Multiple Autoroles\n\u2022Self-Roles\n\u2022Role/Nickname Remembrance\n\u2022XP/Level Rewards System\n\u2022Mee6 XP Importing\n\u2022Server Currency, Items, and Shops\n\u2022Custom Commands\n\u2022Rich Dashboard\n\u2022Global Ban Protection\n\u2022Custom Prefixes";

    //Embed
    let embed = new Discord.RichEmbed()
        .setTitle("Help")
        .setDescription(contentType === "Modules" ? `Choose one of the following modules. For example, you can choose the basic module by saying \`${prefix}help basic\`` : "")
        .setColor(_.colors.geola)
        .addField("Prefix", `**${prefix}**`, true)
        .addField("Mod Prefix", `**${modPrefix}**`, true);

    //Embed content
    let splitContent = content.split("\n");
    content = [];
    let thisContent = "";
    while (splitContent.length) {
        if (thisContent.length + splitContent[0].length + 1 <= 1024) {
            thisContent = `${thisContent}\n${splitContent[0]}`;
            splitContent.splice(0, 1);
        }
        else {
            content.push(thisContent);
            thisContent = "";
        }
    }
    content.push(thisContent);

    content.forEach((c, i) => embed.addField(i === 0 ? contentType : "\u200b", c));

    //Embed links
    embed.addField("\u200b", "[Invite Me](http://geolabot.com/invite) \u2022 [Join My Hub (Support Server)](https://discord.gg/eCDafVC) \u2022 [Donate](http://geolabot.com/donate)");

    //Send
    let sent = await _.promise(message.author.send(embed), true);

    if (message.guild) {
        if (sent) _.send({ //sent
            client,
            id: "help sent",
            channel: message.channel,
            message: "I've DMed you your request!",
            emoji: "mailbox_with_mail"
        });
        else _.send({ //blocked or dms disabled
            client,
            id: "help cant dm",
            channel: message.channel,
            message: "Looks like you have either disabled allowing DMs from people on servers or you have blocked me! You need to reenable the setting or unblock me so that I can DM you your request",
            emoji: "x"
        });
    }

    //Post command
    await _.postCommand(client, message, "Help");
};