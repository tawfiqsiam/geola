module.exports = (client, prefix, { server }) => {

    //Over 20 chars
    if (prefix.length > 20) return;

    //Set prefix
    server.data.prefix = prefix;
};