module.exports = async (client, ...targets) => {

    //Pre Module
    const { Discord, models } = client.modules.misc.preModule(client);

    //Get data
    let data = await models.data.findOne();

    //Check for blacklist
    for (let t of targets) if (data[t instanceof Discord.User ? "blacklistedUsers" : "blacklistedServers"].find(b => b.id === t.id)) return true;

    //No blacklist
    return false;
};