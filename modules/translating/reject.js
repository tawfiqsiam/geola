module.exports = async (client, reaction, user) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    const userData = await models.users.findById(user.id);
    if (!userData.verifiedTranslator) userData.verifiedTranslator = {};

    //Already writing message
    if (userData.verifiedTranslator.message) {

        reaction.remove(user);

        const message = await client.translating.send(`:x:  **|  ${user}, You are already writing a message! Say \`cancel\` to cancel**`);
        message.delete(5000);

        return;
    }

    //Set message data
    userData.verifiedTranslator.message = reaction.message.id;
    userData.verifiedTranslator.messageType = "reject";

    //Send
    const message = await client.translating.send(`:heavy_multiplication_x:  **|  ${user}, What is the reason for rejecting the translation? Say \`cancel\` to cancel**`);
    message.delete(5000);

    //Save
    _.save(client, userData);
};