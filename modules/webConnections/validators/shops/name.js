module.exports = (client, { id, data: name, allData }, { server }) => {

    //Name not changed
    if (id === name) return;

    //New name in use
    if (server.data.shops.find(s => s.name === name)) return;

    //Get shop
    const shop = server.data.shops.find(s => s.name === id);

    //Set name
    shop.name = name;
    allData.id = name;
};