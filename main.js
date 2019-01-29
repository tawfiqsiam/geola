module.exports = async () => {

    //Modules
    const Discord = require("discord.js");
    const client = new Discord.Client();
    const mongoose = require("mongoose");
    const chalk = require("chalk");
    const express = require("express");

    //Build client: Load modules
    console.log(chalk.magenta("Loading Modules..."));

    client.modules = require("./modules/misc/loadModules")();

    console.log(chalk.green("Loaded Modules!"));

    //Build client: Other
    client.latestQuery = null;
    client.cooldowns = new Map();
    client.botUse = new Map();

    //Build client: Models
    client.models = client.modules.misc.getModels.main(client);

    //MongoDB
    console.log(chalk.magenta("Connecting to MongoDB..."));

    mongoose.connect(`mongodb://${process.env.IP}`, {
        dbName: process.env.DB_NAME,
        user: "root",
        pass: process.env.DB_PASSWORD
    });

    console.log(chalk.green("Connected to MongoDB!"));

    //Web Connections
    const app = express();
    const webserver = require("http").createServer(app);
    const io = require("socket.io")(webserver);

    app.use(express.static(`${__dirname}/node_modules`));

    io.on("connection", con => client.modules.webConnector(client, con));

    webserver.listen(4200);

    //Promise Rejections
    process.on("unhandledRejection", reason => {

        //Filter
        if (["Missing Permissions", "Missing Access"].includes(reason.toString())) return;

        //Log
        console.log(chalk.red(reason.stack));
    });

    //Websocket errors
    client.on("error", () => { });

    //Ready
    client.on("ready", async () => {

        //Log
        console.log(chalk.green("Bot online!"));

        //Set Activity
        client.user.setActivity("say g!help");

        //Build client: Misc
        client.apixel = client.users.get("196795781410324480");
        client.geolasHub = client.guilds.get("318467989655781389");
        client.developerRole = client.geolasHub.roles.get("425060987578875904");
        client.verifiedRole = client.geolasHub.roles.get("413525830728417280");
        client.changeLog = client.channels.get("354383167999967234");
        client.alert = client.channels.get("379346160122593280");
        client.alert = client.alert.send.bind(client.alert);
        client.joinLeave = client.channels.get("351121983322325002");
        client.joinLeave = client.joinLeave.send.bind(client.joinLeave);
    });

    //Message
    client.on("message", message => client.modules.message(client, message));

    //Message deleted
    client.on("messageDelete", message => client.modules.messageDelete.main(client, message));

    //Messages pruned
    client.on("messageDeleteBulk", messages => client.modules.messagesPruned.main(client, messages));

    //Message update
    client.on("messageUpdate", (oldMessage, newMessage) => client.modules.messageUpdate(client, oldMessage, newMessage));

    //Server join
    client.on("guildCreate", guild => client.modules.serverJoin(client, guild));

    //Server leave
    client.on("guildDelete", guild => client.modules.serverLeave(client, guild));

    //Server update
    client.on("guildUpdate", (oldGuild, newGuild) => client.modules.serverUpdate.main(client, oldGuild, newGuild));

    //Channel create
    client.on("channelCreate", channel => client.modules.channelCreate.main(client, channel));

    //Channel delete
    client.on("channelDelete", channel => client.modules.channelDelete.main(client, channel));

    //Channel update
    client.on("channelUpdate", (oldChannel, newChannel) => client.modules.channelUpdate.main(client, oldChannel, newChannel));

    //Role create
    client.on("roleCreate", role => client.modules.roleCreate.main(client, role));

    //Role delete
    client.on("roleDelete", role => client.modules.roleDelete.main(client, role));

    //Role update
    client.on("roleUpdate", (oldRole, newRole) => client.modules.roleUpdate.main(client, oldRole, newRole));

    //Emoji create
    client.on("emojiCreate", emoji => client.modules.emojiCreate.main(client, emoji));

    //Emoji delete
    client.on("emojiDelete", emoji => client.modules.emojiDelete.main(client, emoji));

    //Emoji update
    client.on("emojiUpdate", (oldEmoji, newEmoji) => client.modules.emojiUpdate.main(client, oldEmoji, newEmoji));

    //Member join
    client.on("guildMemberAdd", member => client.modules.memberJoin.main(client, member));

    //Member leave
    client.on("guildMemberRemove", member => client.modules.memberLeave.main(client, member));

    //Member update
    client.on("guildMemberUpdate", (oldMember, newMember) => client.modules.memberUpdate.main(client, oldMember, newMember));

    //Member banned
    client.on("guildBanAdd", (guild, user) => client.modules.memberBanned.main(client, guild, user));

    //Member unbanned
    client.on("guildBanRemove", (guild, user) => client.modules.memberUnbanned.main(client, guild, user));

    //Login
    client.login(process.env.TOKEN);

    //Bot Use Timer
    setInterval(() => client.botUse.clear(), 10000);
};