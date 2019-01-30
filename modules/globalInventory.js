module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Global Inventory", 3000)) return;

    //Get params
    const PARAMS = message.content.split(" ").slice(1).join(" ");
    let page = parseInt(PARAMS.replace(/(<.*?>)/g, "").replace(/[^0-9]/g, ""));
    const TARGET_PARAMS = PARAMS.split("<").slice(1).join("<");
    let target = TARGET_PARAMS.substring(0, TARGET_PARAMS.indexOf(">")).replace(/[<>@!]/g, "");
    if (target === "") target = message.author.id;

    //Get user object
    target = client.users.get(target);

    //No user
    if (!target) return _.send({
        client,
        id: "globalinventory no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Invalid page number
    if ((page < 1) || (isNaN(page))) page = 1;

    //Get data
    const data = target.id === message.author.id ?
        message.author.data :
        await models.users.findById(target.id);

    //Build items
    const number = 10 * (page - 1);
    let items = "";
    for (let i = number; i < number + 10; i++) {
        let item = data.inv[i];
        if (item) items = `${items}\n${item.name}: ${item.amount}`;
    }

    //No items
    if (!data.inv.length) items = "*None*";

    //Page too high
    if (items === "") return _.send({
        client,
        id: "globalinventory page too high",
        channel: message.channel,
        message: "You don't have that many items! Try a lower page number",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${target.tag}'s Global Inventory`, target.displayAvatarURL)
        .setDescription(items)
        .setColor(await _.getColor(target.displayAvatarURL));

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Global Inventory");
};