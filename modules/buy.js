module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const memberData = message.member.data;

    //Pre command
    if (!await _.preCommand(client, message, "Buy", 2000)) return;

    //Param not in "quotes"
    if (message.content.replace(/[^"]/g, "").length !== 2) return _.send({
        client,
        id: "buy param not in quotes",
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
        id: "buy no shop",
        channel: message.channel,
        message: "That shop doesn't exist!",
        emoji: "x"
    });

    //Get item
    let role = _.findRole(message.guild, item);
    item = (role && role.id) || item;
    item = shop.items.find(i => i.name.toLowerCase().replace(/\s+/g, "") === item.toLowerCase().replace(/\s+/g, ""));

    //Not purchasable
    if ((!item) || (!item.price)) return _.send({
        client,
        id: "buy not purchasable",
        channel: message.channel,
        message: "That item isn't purchasable there!",
        emoji: "x"
    });

    //Member already has role
    if ((item.itemType === "role") && (message.member.roles.has(item.name))) return _.send({
        client,
        id: "buy already has role",
        channel: message.channel,
        message: "You already have that role!",
        emoji: "x"
    });

    //Set amount for role
    if (item.itemType === "role") amount = 1;

    //Get total price
    const price = item.price * amount;

    //Not enough currency
    if (memberData.currency < price) return _.send({
        client,
        id: "buy this bitch too poor",
        channel: message.channel,
        message: "The price is {VAR1} {VAR3} but you only have {VAR2} {VAR3}!",
        emoji: "x",
        vars: [price, memberData.currency, message.guild.data.currencyName]
    });

    //Remove currency
    memberData.currency = memberData.currency - price;

    //Add item
    if (item.itemType === "item") _.addItem(memberData.inv, item.name, amount); //item
    else message.member.addRole(item.name); //role

    //Send
    _.send({
        client,
        id: "buy bought",
        channel: message.channel,
        message: "You bought {VAR1} {VAR2} for {VAR3} {VAR4}!",
        emoji: "white_check_mark",
        vars: [amount, item.itemType === "item" ? item.name : message.guild.roles.get(item.name).name, price, message.guild.data.currencyName]
    });

    //Stats
    await _.stats(client, "Items Bought", amount);

    //Post command
    await _.postCommand(client, message);
};