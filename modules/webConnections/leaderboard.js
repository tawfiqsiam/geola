module.exports = async (client, { id, clientSecret, type, page, bot }) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user ID
    let userID = null;
    if ((clientSecret) && (!bot)) {

        const userData = await models.users.findOne({ clientSecret });
        if (userData) userID = userData._id;
    }

    //Get server
    const server = client.guilds.get(id);
    if ((!server) && (id)) return { error: "Invalid server" };

    //Get place
    const place = 5 * (page - 1);

    //Get data
    const data = { name: ((server && server.name) || ("Global Leaderboard")) };
    data.leaderboard = await models[server ? "members" : "users"].aggregate([
        {
            $match: {
                $expr: {
                    $and: [
                        { $eq: [server && "$_id.server", server && server.id] },
                        { $eq: ["$bot", bot] },
                        { $gt: [type === "xp" ? "$xp.totalXP" : "$cubits", 0] }
                    ]
                }
            }
        },
        { $sort: { [type === "xp" ? "xp.totalXP" : "cubits"]: -1 } },
        { $skip: place },
        { $limit: 5 }
    ]);
    data.leaderboard.forEach(async u => {
        const user = client.users.get(u._id.user || u._id) || await client.fetchUser(u._id.user || u._id);
        u.tag = `${user.username}#${user.discriminator}`;
    });

    //Get self data
    if (userID) {

        let userXP = await models[server ? "members" : "users"].findById(server ? { server: server.id, user: userID } : userID);
        userXP = userXP.xp.totalXP;

        data.self = await models[server ? "members" : "users"].countDocuments({
            "_id.server": server && server.id,
            bot,
            "xp.totalXP": { $gte: userXP }
        });
    }

    //Return
    return data;
};