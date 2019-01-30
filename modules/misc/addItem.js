module.exports = (inv, itemName, amount) => {

    //Get item
    let item = inv.find(i => i.name === itemName);

    //Add amount
    if (!item) {
        item = { name: itemName, amount: amount };
        inv.push(item);
    }
    else item.amount = item.amount + amount;
};