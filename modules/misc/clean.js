module.exports = (client, doc) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Clean
    _.cleaners[doc.constructor.modelName](client, doc);
};