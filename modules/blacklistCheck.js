module.exports = async client => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get data
    let data = await models.data.findOne();

    //Users
    data.blacklistedUsers
        .filter(bl => (bl.get("removeTimestamp")) && (bl.removeTimestamp <= Date.now()))
        .forEach(bl => data.blacklistedUsers.splice(data.blacklistedUsers.indexOf(bl), 1));

    //Servers
    data.blacklistedServers
        .filter(bl => (bl.get("removeTimestamp")) && (bl.removeTimestamp <= Date.now()))
        .forEach(bl => data.blacklistedServers.splice(data.blacklistedServers.indexOf(bl), 1));

    //Save doc
    await data.save();
};