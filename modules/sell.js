module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const memberData = message.member.data;

    //Pre command
    if (!await _.preCommand(client, message, "Sell", 2000)) return;

    //Param not in "quotes"
    if (message.content.replace(/[^"]/g, "").length !== 2) return _.send({
        client,
        id: "sell param not in quotes",
        channel: message.channel,
        message: `I couldn't find that item! Make sure the item name is in "quotes"`,
        emoji: "x"
    });

    //Get command params
    const PARAMS = message.content.split(" ").slice(1).join(" ").split(`"`);
    let amount = parseInt(PARAMS[0].trim());
    let item = PARAMS[1];
    let shop = PARAMS[2].trim();

    //No amount
    if (isNaN(amount)) {
        amount = 1;
        item = PARAMS[1];
        shop = PARAMS[2].trim();
    }

    //Invalid amount
    if (amount < 1) amount = 1;

    //Get shop
    shop = message.guild.data.shops.find(s => s.name.toLowerCase().replace(/\s+/g, "") === shop.toLowerCase().replace(/\s+/g, ""));

    //No shop
    if (!shop) return _.send({
        client,
        id: "sell no shop",
        channel: message.channel,
        message: "That shop doesn't exist!",
        emoji: "x"
    });

    //Get item
    let role = _.findRole(message.guild, item);
    item = (role && role.id && shop.items.find(i => i.name.toLowerCase().replace(/\s+/g, "") === role.id)) || shop.items.find(i => i.name.toLowerCase().replace(/\s+/g, "") === item.toLowerCase().replace(/\s+/g, ""));

    //Not sellable
    if ((!item) || (!item.sellPrice)) return _.send({
        client,
        id: "sell not sellable",
        channel: message.channel,
        message: "That item isn't sellable there!",
        emoji: "x"
    });

    //Member doesnt have role
    if ((item.itemType === "role") && (!message.member.roles.has(item.name))) return _.send({
        client,
        id: "sell doesnt have role",
        channel: message.channel,
        message: "You don't have that role!",
        emoji: "x"
    });

    //Set amount for role
    if (item.itemType === "role") amount = 1;

    //Get total sell price
    const sellPrice = item.sellPrice * amount;

    //No items
    const invItem = memberData.inv.find(i => i.name === item.name);
    if ((item.itemType === "item") && (!invItem)) return _.send({
        client,
        id: "sell no items",
        channel: message.channel,
        message: "You don't have any {VAR1}!",
        emoji: "x",
        vars: [item.name]
    });

    //Not enough items
    if ((item.itemType === "item") && (invItem.amount < amount)) return _.send({
        client,
        id: "sell not enough items",
        channel: message.channel,
        message: "You only have {VAR1} {VAR2}!",
        emoji: "x",
        vars: [invItem.amount, item.name]
    });

    //Add currency
    memberData.currency = memberData.currency + sellPrice;

    //Remove item
    if (item.itemType === "item") _.removeItem(memberData.inv, item.name, amount); //item
    else message.member.removeRole(item.name); //role

    //Send
    _.send({
        client,
        id: "sell sold",
        channel: message.channel,
        message: "You sold {VAR1} {VAR2} for {VAR3} {VAR4}!",
        emoji: "white_check_mark",
        vars: [amount, item.itemType === "item" ? item.name : message.guild.roles.get(item.name).name, sellPrice, message.guild.data.currencyName]
    });

    //Stats
    await _.stats(client, "Items Sold", amount);

    //Post command
    await _.postCommand(client, message);
};