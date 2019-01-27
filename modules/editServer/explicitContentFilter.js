module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "");

    if (["none", "teaparty", "nothing", "1"].includes(value)) value = [0, "none"];
    else if (["norole", "roleless", "membership", "2"].includes(value)) value = [1, "roleless members"];
    else if (["all", "everything", "everyone", "clean", "3"].includes(value)) value = [2, "all"];
    else return _.send({
        client,
        id: "editserver explicit content filter invalid",
        channel: message.channel,
        message: "The explicit content filter must be either `{VAR1}`, `{VAR2}`, or `{VAR3}`!",
        emoji: "x",
        vars: ["None", "Roleless", "All"]
    });

    return {
        value: value[0],
        action: "setExplicitContentFilter",
        id: "editserver explicit content filter",
        message: "The server's Explicit Content Filter has been set to {VAR1}!",
        vars: [value[1]]
    };
};