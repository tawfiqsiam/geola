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
    let data = await models[`${type}s`].findById(target);

    //No user/server
    if (!data) return message.channel.send(`:x:  **|  That ${type} doesn't exist!**`);

    //Not verified
    if (!data.verified) return message.channel.send(`:x:  **|  That ${type} isn't Verified!**`);

    //Update doc
    data.verified = undefined;
    await _.save(client, data);

    //Remove role
    let member = await _.promise(client.geolasHub.fetchMember(target), true);
    if ((type === "user") && (member)) member.removeRole(client.verifiedRole);

    //Send
    message.channel.send(`:white_check_mark:  **|  ${type === "user" ? `<@${target}>` : (client.guilds.get(target) ? client.guilds.get(target).name : target)} is no longer Verified!**`);
};