module.exports = async (client, doc) => new Promise(resolve => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Get save queue + queue
    const saveQueue = client.saveQueues[doc.constructor.modelName];
    const queueData = saveQueue.get(doc._id) || { docs: [], saving: false };

    //Add to queue
    queueData.docs.push({ doc, resolvePromise: resolve });

    //Update queue
    saveQueue.set(doc._id, queueData);

    //Run saver
    _.saver(client);
});