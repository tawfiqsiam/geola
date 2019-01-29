module.exports = client => {

    //Modules
    const mongoose = require("mongoose");

    //Get builders
    const builders = client.modules.misc.getModels;

    //Build
    delete builders.main;
    let models = {};
    for (let builder in builders) {

        let schemaData = builders[builder];

        let schema = new mongoose.Schema(schemaData, {
            collection: builder,
            strict: (["stats", "translations"].includes(builder) ? false : "throw")
        });

        models[builder] = mongoose.model(builder, schema);
    }

    return models;
};