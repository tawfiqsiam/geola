module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.replace(/\s+/g, "").replace(/#/g, "");

    if (value === "") value = "000000";

    //Invalid color
    if (!/^[0-9A-F]{6}$/i.test(value)) return _.send({
        client,
        id: "editrole color invalid",
        channel: message.channel,
        message: "That color doesn't exist! Make sure that it's a hex value",
        emoji: "x"
    });

    return {
        value: value,
        action: "setColor",
        id: "editrole color",
        message: value === "000000" ? "The role's color has been reset!" : "The role's color has been set to {VAR1}!",
        vars: value === "000000" ? null : [`#${value}`]
    };
};