module.exports = async (client, xpCooldown, { server }) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //No xp cooldown
    if (!xpCooldown) return;

    //Import cooldown not done
    if (server.data.mee6ImportCooldown > Date.now()) return;

    //Mee6 not on server
    if (!await _.promise(server.fetchMember("159985870458322944"), true)) return;

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Set cooldown
    server.data.xp.cooldown = 60000;

    //Set import cooldown
    server.data.mee6ImportCooldown = Date.now() + 3600000;
};