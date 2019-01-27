module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "");

    if (["yes", "true"].includes(value)) value = true;
    else if (["no", "false"].includes(value)) value = false;
    else return _.send({
        client,
        id: "editrole hoist invalid",
        channel: message.channel,
        message: "You must specify `yes` or `no`!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setHoist",
        id: "editrole hoist",
        message: value ? "The role is now hoisted!" : "The role is no longer hoisted!"
    };
};