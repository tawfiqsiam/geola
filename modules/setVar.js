module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!await _.isDev(client, message.author)) return;

    //Phrase name not in "quotes"
    if (message.content.replace(/[^"]/g, "").length !== 2) return message.channel.send(`:x:  **|  I couldn't find that phrase! Make sure the phrase is in "quotes"**`);

    //Get command params
    const PARAMS = message.content.split(`"`);
    let phrase = PARAMS.slice(1, 2).join(`"`);
    let number = parseInt(PARAMS[2].trim().split(" ").slice(0, 1).join(" "));
    let text = PARAMS[2].trim().split(" ").slice(1).join(" ");

    //Parse number
    if (number < 1) number = 1;
    if (isNaN(number)) return message.channel.send(":x:  **|  Invalid number!**");

    //Get translation data
    const translationData = await models.translations.findById(phrase);
    if (!translationData) return message.channel.send(":x:  **|  That phrase doesn't exist!**");

    //Invalid number
    if (!translationData.english.includes(`{VAR${number}}`)) return message.channel.send(":x:  **|  That phrase doesn't have that number!**");

    //Get var
    if (!translationData.vars) translationData.vars = [];
    const variable = translationData.vars.find(v => v.number === number);

    //Set var
    if (text === "") {
        if (variable) translationData.vars.splice(translationData.vars.indexOf(variable), 1);
        else return message.channel.send(":x:  **|  That number isn't set for that phrase!**");
    }
    else if (!variable) translationData.vars.push({ number, text });
    else variable.text = text;

    //Save
    _.save(client, translationData);

    //Send
    message.channel.send(":white_check_mark:  **|  Done!**");
};