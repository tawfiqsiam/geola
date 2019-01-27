module.exports = async (client, message, value) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    value = value.toLowerCase().replace(/\s+/g, "");

    if (["none", "unrestricted", "nothing", "1", "white"].includes(value)) value = [0, "none"];
    else if (["low", "verifiedemail", "email", "4", "green"].includes(value)) value = [1, "low"];
    else if (["medium", "registeredondiscord", "registereddiscord", "registered", "3", "yellow"].includes(value)) value = [2, "medium"];
    else if (["high", "(╯°□°）╯︵┻━┻", "tableflip", "memberofserver", "memberserver", "member", "4", "orange"].includes(value)) value = [3, "(╯°□°）╯︵ ┻━┻"];
    else if (["veryhigh", "(ノಠ益ಠ)ノ彡┻━┻", "verifiedphone", "phone", "doubletableflip", "doubleflip", "5", "red"].includes(value)) value = [4, "(ノಠ益ಠ)ノ彡┻━┻"];
    else return _.send({
        client,
        id: "editserver verif level invalid",
        channel: message.channel,
        message: "The verification level must be either `{VAR1}`, `{VAR2}`, `{VAR3}`, `{VAR4}`, or `{VAR5}`!",
        emoji: "x",
        vars: ["None", "Low", "Medium", "Table Flip", "Double Table Flip"]
    });

    return {
        value: value[0],
        action: "setVerificationLevel",
        id: "editserver verif level",
        message: "The server's Verification Level has been set to {VAR1}!",
        vars: [value[1]]
    };
};