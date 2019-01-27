module.exports = (client, name, { server }) => {

    //Name in use
    if (server.data.shops.find(s => s.name === name)) return;

    //Add shop
    server.data.shops.push({ name });
};