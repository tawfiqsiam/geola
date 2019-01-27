module.exports = (client, { id, data: items }, { server }) => {

    //Get shop
    const shop = server.data.shops.find(s => s.name === id);

    //Set items
    shop.items = [];
    items.forEach(i => {
        let item = { name: i.name, itemType: i.itemType };
        if (i.price) item.price = i.price;
        if (i.sellPrice) item.sellPrice = i.sellPrice;
        shop.items.push(item);
    });
};