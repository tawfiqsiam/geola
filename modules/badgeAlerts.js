module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, message.guild && "Global Profile", 2000)) return;

    //Get params
    let action = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

    //Parse action
    if (["enable", "enabled", "on", "toggleon", "yes", "true"].includes(action)) action = true;
    else if (["disable", "disabled", "off", "toggleoff", "no", "false"].includes(action)) action = false;
    else {
        if (message.guild) _.send({
            client,
            id: "badgealerts invalid action",
            channel: message.channel,
            message: "You must specify `enable` or `disable`!",
            emoji: "x"
        });
        else message.channel.send(":x:  **|  You must specify `enable` or `disable`!**");

        return;
    }

    //Get user data
    const userData = message.author.data ?
        message.author.data :
        await models.users.findById(message.author.id);

    //Badge alerts already enabled
    if ((action) && (!userData.get("badgeAlertsDisabled"))) {
        if (message.guild) _.send({
            client,
            id: "badgealerts already enabled",
            channel: message.channel,
            message: "Badge alerts are already enabled!",
            emoji: "x"
        });
        else message.channel.send(":x:  **|  Badge alerts are already enabled!**");

        return;
    }

    //Badge alerts already disabled
    if ((!action) && (userData.get("badgeAlertsDisabled"))) {
        if (message.guild) _.send({
            client,
            id: "badgealerts already disabled",
            channel: message.channel,
            message: "Badge alerts are already disabled!",
            emoji: "x"
        });
        else message.channel.send(":x:  **|  Badge alerts are already disabled!**");

        return;
    }

    //Set badge alert
    userData.badgeAlertsDisabled = action ? undefined : true;

    //Save doc
    await _.save(client, userData);

    //Send
    if (message.guild) _.send({
        client,
        id: `badgealerts ${action ? "enabled" : "disabled"}`,
        channel: message.channel,
        message: `Badge alerts are now ${action ? "enabled" : "disabled"}!`,
        emoji: "white_check_mark"
    });
    else message.channel.send(`:white_check_mark:  **|  Badge alerts are now ${action ? "enabled" : "disabled"}!**`);
};