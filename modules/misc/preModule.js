module.exports = client => {
    return {
        Discord: require("discord.js"),
        mongoose: require("mongoose"),
        chalk: require("chalk"),
        models: client.models,
        _: client.modules.misc
    };
};