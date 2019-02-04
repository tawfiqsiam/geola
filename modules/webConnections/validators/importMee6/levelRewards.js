module.exports = async (client, levelRewards, { server }) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //No level rewards import
    if (!levelRewards) return;

    //Mee6 not on server
    if (!await _.promise(server.fetchMember("159985870458322944"), true)) return;

    //Fetch data
    const data = await (await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${server.id}`)).json();

    //Set level rewards
    levelRewards = data.role_rewards.map(lr => ({ level: lr.rank, addRoles: [lr.role.id] }));
    levelRewards.forEach(lr => {

        let levelReward = server.data.levelRewards.find(l => l.level === lr.level);

        if (!levelReward) return server.data.levelRewards.push(lr);

        if (!levelReward.addRoles) levelReward.addRoles = [];
        if (!levelReward.addRoles.includes(lr.addRoles[0])) levelReward.addRoles.push(lr.addRoles[0]);
    });
};