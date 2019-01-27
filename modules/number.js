module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");
    const toName = require("integer-to-cardinal-english");

    //Pre command
    if (!await _.preCommand(client, message, "Number", 3000)) return;

    //Get command params
    let query = parseInt(message.content.split(" ").slice(1).join(" "));

    //Random
    if (isNaN(query)) query = "random";

    if (query > 99999999999999999999) return _.send({
        client,
        id: "number too large",
        channel: message.channel,
        message: "The number can't be larger than 99,999,999,999,999,999,999! Yeah I know, it's oddly specific...",
        emoji: "x"
    });

    //Fetch
    let data = await fetch(`http://numbersapi.com/${query}`);
    data = await data.text();

    //Parse
    let number = parseInt(data.split(" ")[0]);
    if (number <= 999999999999999) number = `${toName(number)} (${number})`; //library max

    //Embed
    let embed = new Discord.RichEmbed()
        .setTitle(number)
        .setDescription(data)
        .setColor(_.colors.geola);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Number");
};