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

    //Already verified
    if (data.verified) return message.channel.send(`:x:  **|  That ${type} is already Verified!**`);

    //Update doc
    data.verified = true;
    await _.save(client, data);

    //Add role
    let member = await _.promise(client.geolasHub.fetchMember(target), true);
    if ((type === "user") && (member)) member.addRole(client.verifiedRole);

    //Send
    message.channel.send(`:white_check_mark:  **|  ${type === "user" ? `<@${target}>` : (client.guilds.get(target) ? client.guilds.get(target).name : target)} has been Verified!**`);
};