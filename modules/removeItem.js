module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if ((!message.member.hasPermission("MANAGE_ROLES")) && (!message.member.hasPermission("MANAGE_GUILD"))) return;

    //Get command params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let amount = parseInt(PARAMS.slice(2, 3).join(" "));
    let item = PARAMS.slice(3).join(" ");

    //No user/amount/item specified
    if (target === "") return _.send({
        client,
        id: "removeitem no user, amount, and item entered",
        channel: message.channel,
        message: "You must specify a user, amount, and item!",
        emoji: "x"
    });

    //No amount
    if (isNaN(amount)) {
        amount = 1;
        item = PARAMS.slice(2).join(" ");
    }

    //Invalid amount
    if (amount < 1) amount = 1;

    //No item specified
    if (item === "") return _.send({
        client,
        id: "removeitem no item entered",
        channel: message.channel,
        message: "You must specify an item!",
        emoji: "x"
    });

    //Get member object
    target = await _.promise(message.guild.fetchMember(target), true);

    //No user found
    if (!target) return _.send({
        client,
        id: "removeitem no user",
        channel: message.channel,
        message: "I couldn't find that user!",
        emoji: "x"
    });

    //Get target data
    let targetData = target.id === message.author.id ?
        message.member.data :
        await models.members.findById({ server: message.guild.id, user: target.id });

    //Get item
    item = message.guild.data.get("items") ?
        message.guild.data.items.find(i => i.toLowerCase().replace(/\s+/g, "") === item.toLowerCase().replace(/\s+/g, "")) :
        null;

    //Item doesnt exist
    if (!item) return _.send({
        client,
        id: "removeitem item doesnt exist",
        channel: message.channel,
        message: "That item doesn't exist!",
        emoji: "x"
    });

    //Not enough items in inv
    const invItem = targetData.inv.find(i => i.name === item);
    if ((!invItem) || (invItem.amount < amount)) return _.send({
        client,
        id: "removeitem not enough items in inv",
        channel: message.channel,
        message: "That user doesn't have that many {VAR1}!",
        emoji: "x",
        vars: [item]
    });

    //Remove item
    _.removeItem(targetData.inv, item, amount);
    await _.save(client, targetData);

    //Send
    _.send({
        client,
        id: "removeitem item added",
        channel: message.channel,
        message: "{VAR1} now has {VAR2} less {VAR3}!",
        emoji: "white_check_mark",
        vars: [target, amount, item]
    });

    //Stats
    await _.stats(client, "Items Removed");
};