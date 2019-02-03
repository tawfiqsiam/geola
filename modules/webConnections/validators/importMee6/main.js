module.exports = async (client, importMee6, { server }) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Mee6 not on server
    if (!await _.promise(server.fetchMember("159985870458322944"), true)) return;

    //Import mee6
};