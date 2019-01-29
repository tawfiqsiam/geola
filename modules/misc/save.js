module.exports = async (client, ...docs) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);
    const saving = [];

    //Loop through each doc
    for (let doc of docs) {

        //Get doc info
        const model = doc.constructor.modelName;
        const id = model === "members" ? Object.assign({}, doc._id) : doc._id;
        const docObject = doc.toObject();
        const modifiedPaths = doc.modifiedPaths().filter(mp => (!mp.includes(".")) && (!docObject.hasOwnProperty(mp)));

        //Unsets
        const unsets = {};
        modifiedPaths.forEach(mp => unsets[mp] = 1);
        if (Object.keys(unsets).length) docObject["$unset"] = unsets;

        //Update doc
        saving.push(models[model].findByIdAndUpdate(id, docObject).exec());
    }

    //Await updates
    await Promise.all(saving);
};