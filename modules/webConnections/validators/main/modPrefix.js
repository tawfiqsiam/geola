module.exports = (client, modPrefix, { server }) => {

    //Over 20 chars
    if (modPrefix.length > 20) return;

    //Set mod prefix
    server.data.modPrefix = modPrefix;
};