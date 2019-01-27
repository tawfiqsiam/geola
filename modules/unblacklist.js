module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!await _.isDev(client, message.author)) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let type = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let target = PARAMS.slice(2).join(" ").replace(/[<>@!]/g, "");

    //Invalid type
    if (!["user", "server"].includes(type)) return message.channel.send(":x:  **|  Invalid type!**");

    //Get data
    let data = await models.data.findOne();

    //Not blacklisted
    if (!data[type === "user" ? "blacklistedUsers" : "blacklistedServers"].find(bl => bl.id === target)) return message.channel.send(`:x:  **|  That ${type} isn't blacklisted!**`);

    //Remove from DB
    const arr = data[type === "user" ? "blacklistedUsers" : "blacklistedServers"];
    arr.splice(arr.indexOf(arr.find(bl => bl.id === target)), 1);
    await data.save();

    //Send
    message.channel.send(`:white_check_mark:  **|  Unblacklisted ${type}!**`);
};