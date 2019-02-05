module.exports = async (client, reaction, user) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    const userData = await models.users.findById(user.id);
    if (!userData.devTranslator) userData.devTranslator = {};

    //Already writing message
    if (userData.devTranslator.message) {

        reaction.remove(user);

        const message = await client.devTranslating.send(`:x:  **|  ${user}, You are already writing a message! Say \`cancel\` to cancel**`);
        message.delete(5000);

        return;
    }

    //Set message data
    userData.devTranslator.message = reaction.message.id;
    userData.devTranslator.messageType = "edit";

    //Send
    const message = await client.devTranslating.send(`:pencil2:  **|  ${user}, How would you like to edit the translation? Say \`cancel\` to cancel**`);
    message.delete(5000);

    //Save
    _.save(client, userData);
};