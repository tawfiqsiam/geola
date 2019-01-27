module.exports = (client, { id, data: items }, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set items
    acr.addItems = [];
    acr.removeItems = [];
    items.forEach(i => {
        if (i.amount > 0) acr.addItems.push({ name: i.item, amount: i.amount });
        else if (i.amount < 0) acr.removeItems.push({ name: i.item, amount: i.amount / -1 });
    });
};