module.exports = async (client, name, amount) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Parse amount
    if (!amount) amount = 1;

    //Update DB
    const date = new Date();
    await models.stats.findByIdAndUpdate(
        {
            year: date.getFullYear(),
            month: date.getMonth() + 1
        },
        { $inc: { [name]: amount } },
        { upsert: true }
    );
};