module.exports = (client, name, { server }) => {

    //Get item
    const item = server.data.items.find(i => i === name);

    //Item doesnt exist
    if (!item) return;

    //Remove item
    server.data.items.splice(server.data.items.indexOf(item), 1);

    //Remove from shops
    server.data.shops.forEach(s => {
        let item = s.items.find(i => i.name === name);
        if (item) s.items.splice(s.items.indexOf(item), 1);
    });
};