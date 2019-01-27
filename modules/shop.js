module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Shop", 2000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1).join(" ");
    let name = PARAMS.replace(/[0-9]/g, "");
    let page = PARAMS.replace(/[^0-9]/g, "");

    //Invalid page number
    if ((page < 1) || (isNaN(page))) page = 1;

    //No shop
    if (name === "") return _.send({
        client,
        id: "shop no name entered",
        channel: message.channel,
        message: "You must provide a shop name!",
        emoji: "x"
    });

    //Get shop
    let shop = message.guild.data.shops.find(s => s.name.toLowerCase().replace(/\s+/g, "") === name.toLowerCase().replace(/\s+/g, ""));

    //No shop
    if (!shop) return _.send({
        client,
        id: "shop no shop",
        channel: message.channel,
        message: "That shop doesn't exist!",
        emoji: "x"
    });

    //Get items
    let items = "";
    const currencyName = message.guild.data.currencyName;
    for (let i = (page * 5) - 5; i < page * 5; i++) {

        let item = shop.items[i];
        if (item) items = `${items}\n\n**${item.itemType === "item" ? item.name : message.guild.roles.get(item.name).name}:**\nType: ${item.itemType === "item" ? "Item" : "Role"}${item.price ? `\nPrice: ${item.price} ${currencyName}` : ""}${item.sellPrice ? `\nSell Price: ${item.sellPrice} ${currencyName}` : ""}`;
    }

    //No items
    if ((items === "") && (page === 1)) items = "*None*";

    //Page too high
    if (items === "") return _.send({
        client,
        id: "shop page too high",
        channel: message.channel,
        message: "That shop doesn't have that many items! Try a lower page number",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(shop.name, message.guild.iconURL)
        .setDescription(`Page ${page}`)
        .setColor(await _.getColor(message.guild.iconURL))
        .addField("Items", items);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Shop");
};