module.exports = async (client, user) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    let data = await models.data.findOne();
    return data.globalBans.find(b => b.user === user.id);
};