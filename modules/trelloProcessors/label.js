module.exports = {

    parse: (client, message, data) => {

        //Pre Module
        const { _ } = client.modules.misc.preModule(client);

        data = data.split(" ");

        //No board and label
        if (!data[0]) return _.send({
            client,
            id: "trello label no board and label",
            channel: message.channel,
            message: "You must specify the Board URL and Label name!",
            emoji: "x"
        });

        //No label
        if (!data[1]) return _.send({
            client,
            id: "trello label no label",
            channel: message.channel,
            message: "You must specify the Label name!",
            emoji: "x"
        });

        //Get board
        let board = data[0];
        board = board.split("/b/");
        if (board.length === 2) board = board[1];
        else board = board.join("");
        board = board.split("/")[0];

        //Get label
        let label = data.slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

        return {
            board: board,
            label: label
        };
    },

    fetch: async data => {

        //Modules
        const fetch = require("node-fetch");

        //Fetch + return
        return await fetch(`https://api.trello.com/1/batch?urls=/boards/${data.board}/labels,/boards/${data.board},/boards/${data.board}/cards&key=${process.env.TRELLO_API_KEY}`);
    },

    buildEmbed: (client, message, data, raw) => {

        //Pre Module
        const { Discord, _ } = client.modules.misc.preModule(client);

        //No board
        if (data[0].message === "invalid id") return _.send({
            client,
            id: "trello label no board",
            channel: message.channel,
            message: "That Board doesn't exist!",
            emoji: "x"
        });

        //Missing perms
        if (data[0].message === "unauthorized permission requested") return _.send({
            client,
            id: "trello label missing perms",
            channel: message.channel,
            message: "I don't have permission to access that Board! Make sure that it's public",
            emoji: "x"
        });

        //Parse data
        let label = data[0]["200"].filter(l => l.name.toLowerCase().replace(/\s+/g, "") === raw.label)[0];
        if (!label) return _.send({ //No results
            client,
            id: "trello label no results",
            channel: message.channel,
            message: "No results!",
            emoji: "x"
        });
        let board = data[1]["200"];
        let cards = data[2]["200"].filter(c => (c.labels.length > 0) && c.labels.map(l => l.name.toLowerCase().replace(/\s+/g, "")).includes(raw.label));

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor(`${label.name} on ${board.name}`, "http://www.stickpng.com/assets/images/58482beecef1014c0b5e4a36.png", board.url)
            .setDescription(`${label.name} labels ${cards.length} ${cards.length === 1 ? "card" : "cards"}!`)
            .setColor(client.modules.trelloProcessors.color[label.color ? label.color : "none"])
            .setFooter(`Label ID: ${label.id}`);

        return embed;
    }
};