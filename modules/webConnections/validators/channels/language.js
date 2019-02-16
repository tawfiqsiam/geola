module.exports = async (client, { data: language }, { channel }) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get public languages
    const publicLanguages = (await models.data.findOne()).validLanguages.filter(l => l.public);

    //Invalid language
    if ((!publicLanguages.find(l => l.name === language)) && (language !== "english")) return;

    //Set language
    channel.data.language = language === "english" ? undefined : language;
};