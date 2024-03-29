module.exports = async (client, xpRange, { server }) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //No xp range
    if (!xpRange) return;

    //Import cooldown not done
    if (server.data.mee6ImportCooldown > Date.now()) return;

    //Mee6 not on server
    if (!await _.promise(server.fetchMember("159985870458322944"), true)) return;

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Set min/max
    server.data.xp.min = 15;
    server.data.xp.max = 25;

    //Set import cooldown
    server.data.mee6ImportCooldown = Date.now() + 3600000;
};