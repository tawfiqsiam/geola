module.exports = async (client, xp, { server }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //No xp import
    if (!xp) return;

    //Import cooldown not done
    if (server.data.mee6ImportCooldown > Date.now()) return;

    //Mee6 not on server
    if (!await _.promise(server.fetchMember("159985870458322944"), true)) return;

    //Loop through pages
    for (let i = 0; i < server.memberCount; i++) {

        //Fetch data
        const data = await (await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${server.id}?page=${i}`)).json();

        //No more members
        if (!data.players.length) break;

        //Loop through members
        for (let j = 0; j < data.players.length; j++) {

            //Get member
            let member = data.players[j];

            //Get member data
            let memberData = await models.members.findById({ server: server.id, user: member.id });
            if (!memberData) continue;

            let level = member.level;
            let totalXP = 0;
            for (let k = 0; k < level; k++) totalXP = totalXP + ((k * 50) + 200);

            //Member xp higher
            if (memberData.xp.totalXP >= totalXP) continue;

            await models.members.findByIdAndUpdate(
                { server: server.id, user: member.id },
                { xp: { xp: 0, level, totalXP } }
            );
        }
    }

    //Set import cooldown
    server.data.mee6ImportCooldown = Date.now() + 3600000;
};