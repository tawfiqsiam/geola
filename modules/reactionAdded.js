module.exports = async (client, reaction, user) => {

    //Watch twitter
    client.modules.misc.deleteTweetLog(client, reaction, user);
};