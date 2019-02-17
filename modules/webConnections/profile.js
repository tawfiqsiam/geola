module.exports = async (client, id, clientSecret) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get user ID via client secret
    if (!id) {

        const userData = await models.users.findOne({ clientSecret });
        if (!userData) return { error: "Invalid client secret" };

        id = userData._id;
    }

    //Get user
    const user = client.users.get(id);
    if (!user) return { error: "Invalid user" };

    //Get data
    const data = await models.users.findById(id, "xp cubits reputation", { lean: true });
    data.username = user.username;

    //Get self data
    const self = await models.users.countDocuments({
        bot: user.bot,
        "xp.totalXP": { $gte: data.xp.totalXP }
    });
    data.globalLeaderboardRank = self;

    //Return
    return data;
};