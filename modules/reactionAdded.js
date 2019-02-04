module.exports = async (client, reaction, user) => {

    //Translating
    client.modules.translating.main(client, reaction, user);

    //Dev Translating
    client.modules.devTranslating.main(client, reaction, user);
};