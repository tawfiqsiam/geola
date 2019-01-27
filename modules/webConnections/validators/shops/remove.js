module.exports = (client, name, { server }) => {

    //Get shop
    const shop = server.data.shops.find(s => s.name === name);

    //Shop doesnt exist
    if (!shop) return;

    //Remove shop
    server.data.shops.splice(server.data.shops.indexOf(shop), 1);
};