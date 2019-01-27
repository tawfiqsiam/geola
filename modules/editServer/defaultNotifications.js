module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "").replace(/@/g, "");

    if (["all", "allmessages", "allmessage", "allmsgs", "allmsg", "everything"].includes(value)) value = ["ALL", "All Messages"];
    else if (["mentions", "onlymentions", "mention", "onlymention"].includes(value)) value = ["MENTIONS", "Only Mentions"];
    else return _.send({
        client,
        id: "editserver default notifs invalid",
        channel: message.channel,
        message: "The default notifications setting must be either `{VAR1}` or `{VAR2}`!",
        emoji: "x",
        vars: ["All", "Only Mentions"]
    });

    return {
        value: value[0],
        action: "setDefaultMessageNotifications",
        id: "editserver default notifs",
        message: "The server's Default Notifications Setting has been set to {VAR1}!",
        vars: [value[1]]
    };
};