module.exports = (inv, itemName, amount) => {

    //Get item
    let item = inv.find(i => i.name === itemName);
    if (!item) return;

    //Remove amount
    item.amount = item.amount - amount;

    //Zero or less
    if (item.amount <= 0) inv.splice(inv.indexOf(item), 1);
};