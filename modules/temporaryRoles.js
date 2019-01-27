module.exports = async client => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const now = Date.now();

    //Get servers
    const servers = await models.servers.find({
        "temporaryRoles.timestamp": { $lte: now }
    }, "temporaryRoles");

    //Loop through each server
    for (let s of servers) {

        //Get temp roles
        const temporaryRoles = s.temporaryRoles.filter(r => r.timestamp <= now);

        //Loop through each role
        temporaryRoles.forEach(async tr => {

            //Get server
            const server = client.guilds.get(s._id);
            if (!server) return;

            //Fetch member
            let member = await _.promise(server.fetchMember(tr.member), true);
            if (!member) return;

            //Action
            member[`${tr.action}Role`](tr.role).catch(() => { });
        });

        //Remove from temp roles
        s.temporaryRoles = s.temporaryRoles.filter(r => r.timestamp > now);

        //Save doc
        await _.save(client, s);
    }
};