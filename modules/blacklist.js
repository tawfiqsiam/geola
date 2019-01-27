module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!await _.isDev(client, message.author)) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let type = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let target = PARAMS.slice(2, 3).join(" ").replace(/[<>@!]/g, "");
    let cooldown = parseInt(PARAMS.slice(3, 4).join(" "));
    let reason = PARAMS.slice(4).join(" ");

    //Invalid type
    if (!["user", "server"].includes(type)) return message.channel.send(":x:  **|  Invalid type!**");

    //Parse cooldown
    if (isNaN(cooldown)) reason = PARAMS.slice(3).join(" "); //no cooldown
    const removeTimestamp = Date.now() + (cooldown * 3600000) || null;

    //No reason
    if (reason === "") return message.channel.send(":x:  **|  You must provide a reason!**");

    //Get data
    let data = await models.data.findOne();

    //Already blacklisted
    if (data[type === "user" ? "blacklistedUsers" : "blacklistedServers"].find(bl => bl.id === target)) return message.channel.send(`:x:  **|  That ${type} is already blacklisted!**`);

    //Add to DB
    data[type === "user" ? "blacklistedUsers" : "blacklistedServers"].push(
        removeTimestamp ?
            { id: target, reason, removeTimestamp } :
            { id: target, reason }
    );
    await data.save();

    //Leave server if needed
    if (type === "server") {
        let server = client.guilds.get(target);
        if (server) server.leave();
    }

    //Send
    message.channel.send(`:white_check_mark:  **|  Blacklisted ${type}!**`);
};