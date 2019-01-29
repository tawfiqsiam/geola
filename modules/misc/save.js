module.exports = async (client, ...docs) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);
    const saving = [];

    //Loop through each doc
    for (let doc of docs) {

        //Get doc info
        const model = doc.constructor.modelName;
        const id = model === "members" ? Object.assign({}, doc._id) : doc._id;

        //Update doc
        saving.push(models[model].findByIdAndUpdate(id, doc.toObject()).exec());
    }

    //Await updates
    await Promise.all(saving);
};