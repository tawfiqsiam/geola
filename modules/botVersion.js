module.exports = async (client, message) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Check for channel
    if (message.channel.id !== client.changeLog.id) return;

    //Get data
    let data = await models.data.findOne();

    //Add one to updates
    data.updates = data.updates + 1;
    await data.save();
};