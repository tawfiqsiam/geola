module.exports = async (client, id) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user
    const user = client.users.get(id);
    if (!user) return null;

    //Get data
    const data = await models.users.findById(id, "xp cubits reputation", { lean: true });
    data.username = user.username;

    //Get self data
    const validUsers = client.users.filter(u => u.bot === user.bot).map(u => u.id);
    const self = await models.users.countDocuments({
        _id: { $in: validUsers },
        "xp.totalXP": { $gte: data.xp.totalXP }
    });
    data.globalLeaderboardRank = self;

    //Return
    return data;
};