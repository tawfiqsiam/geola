module.exports = async (client, xpUnblacklistBots, { server }) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //No xp unblacklist bots
    if (!xpUnblacklistBots) return;

    //Fetch all members
    await server.fetchMembers();

    //Set xp blacklisted
    await models.members.updateMany(
        {
            "_id.server": server.id,
            bot: true,
            "_id.user": { $in: [...server.members.keys()] }
        },
        { $unset: { "xp.blacklisted": 1 } }
    );
};