module.exports = (client, { id, data: items }, { server }) => {

    //Get level reward
    const levelReward = server.data.levelRewards.find(lr => lr.level === id);

    //Set items
    levelReward.addItems = [];
    levelReward.removeItems = [];
    items.forEach(i => {
        if (i.amount > 0) levelReward.addItems.push({ name: i.item, amount: i.amount });
        else if (i.amount < 0) levelReward.removeItems.push({ name: i.item, amount: i.amount / -1 });
    });
};