module.exports = async (client, clientSecret) => {

    //Pre Module
    const { Discord, models } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return;

    //Get servers
    let servers = await fetch("https://discordapp.com/api/v6/users/@me/guilds", {
        headers: {
            Authorization: `Bearer ${userData.accessToken}`
        }
    });
    servers = await servers.json();
    if (servers.message === "401: Unauthorized") return;

    //Filter servers
    servers = servers.filter(s => (
        client.guilds.get(s.id) &&
        new Discord.Permissions(s.permissions).hasPermission("MANAGE_GUILD")
    )).map(s => ({ name: s.name, id: s.id, iconURL: s.icon && `https://cdn.discordapp.com/icons/${s.id}/${s.icon}.jpg` }));

    //Return
    return servers;
};