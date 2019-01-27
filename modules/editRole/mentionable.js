module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "");

    if (["yes", "true"].includes(value)) value = true;
    else if (["no", "false"].includes(value)) value = false;
    else return _.send({
        client,
        id: "editrole mentionable invalid",
        channel: message.channel,
        message: "You must specify `yes` or `no`!",
        emoji: "x"
    });

    return {
        value: value,
        action: "setMentionable",
        id: "editrole mentionable",
        message: value ? "The role is now mentionable!" : "The role is no longer mentionable!"
    };
};