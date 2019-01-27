module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //Pre command
    if (!await _.preCommand(client, message, "Imgur", 3000)) return;

    //Get command params
    let input = message.content.split(" ").slice(1).join(" ");
    if (input === "") input = message.attachments.array()[0] ? message.attachments.array()[0].url : null;

    //No input
    if (!input) return _.send({
        client,
        id: "imgur no input",
        channel: message.channel,
        message: "You must provide something to search or upload!",
        emoji: "x"
    });

    //Parse param
    const isImage = await _.isImage(input);

    if (isImage) {
        //Upload

        let result = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            body: input,
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        result = await result.json();

        //Parse
        result = result.data.link;

        //Send
        _.send({
            client,
            id: "imgur upload done",
            channel: message.channel,
            message: "Here's your Imgur link: {VAR1}",
            emoji: "frame_photo",
            vars: [result]
        });
    }
    else {
        //Search

        let result = await fetch(`https://api.imgur.com/3/gallery/search?q=${input}`, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
        result = await result.json();

        //No results
        if (result.data.length === 0) return _.send({
            client,
            id: "imgur no results",
            channel: message.channel,
            message: "No results!",
            emoji: "x"
        });

        //Parse
        result = result.data[0];
        if (result.is_album) result = result.images[0];

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor(result.title ? result.title : "Unnamed", "https://media.glassdoor.com/sql/900384/imgur-squarelogo-1512690375276.png", result.link)
            .setDescription(result.description ? result.description : "")
            .setColor(0x1bb76e)
            .setImage(result.link)
            .setFooter(`Image ID: ${result.id}`);

        //Send
        message.channel.send(embed);
    }

    //Post command
    await _.postCommand(client, message, "Imgur");
};