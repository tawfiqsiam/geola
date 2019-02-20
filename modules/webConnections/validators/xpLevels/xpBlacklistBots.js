module.exports = async (client, xpBlacklistBots, { server }) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Fetch all members
    await server.fetchMembers();

    //Set xp blacklisted
    await models.members.updateMany(
        {
            "_id.server": server.id,
            bot: true,
            "_id.user": { $in: [...server.members.keys()] }
        },
        xpBlacklistBots ?
            { "xp.blacklisted": true } :
            { $unset: { "xp.blacklisted": 1 } }
    );
};