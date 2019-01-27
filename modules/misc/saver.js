module.exports = async client => {

    for (let saveQueue in client.saveQueues) for (let queueData of client.saveQueues[saveQueue]) {

        //Parse queue data
        queueData = queueData[1];

        //Already saving
        if (queueData.saving) continue;

        //Update saving
        queueData.saving = true;

        //Loop through docs
        for (let d of queueData.docs) {
            await d.doc.save();
            d.resolvePromise();
        }

        //Update saving
        queueData.saving = false;
    }
};