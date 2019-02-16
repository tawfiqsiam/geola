module.exports = async (client, language, { server }) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get public languages
    const publicLanguages = (await models.data.findOne()).validLanguages.filter(l => l.public);

    //Invalid language
    if ((!publicLanguages.find(l => l.name === language)) && (language !== "english")) return;

    //Set language
    server.data.language = language;
};