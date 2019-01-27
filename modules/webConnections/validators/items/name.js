module.exports = (client, { id, data: name, allData }, { server }) => {

    //Name not changed
    if (id === name) return;

    //New name in use
    if (server.data.items.includes(name)) return;

    //Delete old item
    server.data.items.splice(server.data.items.indexOf(id), 1);

    //Add new item
    server.data.items.push(name);
    allData.id = name;

    //Edit name in shops
    server.data.shops.forEach(s => {
        let item = s.items.find(i => i.name === id);
        if (item) item.name = name;
    });
};