module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const url = require("url");
    const fetch = require("node-fetch");

    //Pre command
    if (!await _.preCommand(client, message, "Down Detector", 3000)) return;

    //Get command params
    const target = message.content.split(" ").slice(1).join(" ");

    //No target
    if (target === "") return _.send({
        client,
        id: "downdetector no target",
        channel: message.channel,
        message: "Which website would you like to check on?",
        emoji: "x"
    });

    //Parse URL
    let targetURL = url.parse(target);

    //No protocol
    if (!targetURL.protocol) targetURL = url.parse(`http://${target}`);

    //Invalid URL
    if (targetURL.host.split(".").slice(1).join(".").length <= 1) return _.send({
        client,
        id: "downdetector invalid url",
        channel: message.channel,
        message: "You must provide a valid URL!",
        emoji: "x"
    });

    //Fetch
    let data = await fetch(`https://isitup.org/${targetURL.host}.json`);
    data = await data.json();

    //No results
    if ((data.status_code === 2) || (!data.domain)) return _.send({
        client,
        id: "downdetector no results",
        channel: message.channel,
        message: "I couldn't find that website!",
        emoji: "x"
    });

    //Embed
    const embed = new Discord.RichEmbed()
        .setTitle(`Down Detector: ${data.domain}`)
        .setDescription(`${data.domain} is ${data.status_code === 1 ? "up!" : "down :("}`)
        .setColor(_.colors[data.status_code === 1 ? "good" : "bad"])
        .setFooter(`IP: ${data.response_ip}`)
        .setTimestamp();

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Down Detector");
};