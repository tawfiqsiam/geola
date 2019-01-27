module.exports = {

    parse: (client, message, data) => {

        //Pre Module
        const { _ } = client.modules.misc.preModule(client);

        data = data.split(" ");

        //No board and card
        if (!data[0]) return _.send({
            client,
            id: "trello card no board and card",
            channel: message.channel,
            message: "You must specify the Board URL and Card name!",
            emoji: "x"
        });

        //No card
        if (!data[1]) return _.send({
            client,
            id: "trello card no card",
            channel: message.channel,
            message: "You must specify the Card name!",
            emoji: "x"
        });

        //Get board
        let board = data[0].split("/b/");
        if (board.length === 2) board = board[1];
        else board = board.join("");
        board = board.split("/")[0];

        //Get card
        let card = data.slice(1).join(" ").toLowerCase().replace(/\s+/g, "");

        return {
            board: board,
            card: card
        };
    },

    fetch: async data => {

        //Modules
        const fetch = require("node-fetch");

        //Fetch + return
        return await fetch(`https://api.trello.com/1/batch?urls=/boards/${data.board}/cards,/boards/${data.board},/boards/${data.board}/lists,/boards/${data.board}/members&key=${process.env.TRELLO_API_KEY}`);
    },

    buildEmbed: (client, message, data, raw) => {

        //Pre Module
        const { Discord, _ } = client.modules.misc.preModule(client);

        //No board
        if (data[0].message === "invalid id") return _.send({
            client,
            id: "trello card no board",
            channel: message.channel,
            message: "That Board doesn't exist!",
            emoji: "x"
        });

        //Missing perms
        if (data[0].message === "unauthorized permission requested") return _.send({
            client,
            id: "trello card missing perms",
            channel: message.channel,
            message: "I don't have permission to access that Board! Make sure that it's public",
            emoji: "x"
        });

        //Parse data
        let card = data[0]["200"].filter(c => c.name.toLowerCase().replace(/\s+/g, "") === raw.card)[0];
        if (!card) return _.send({ //No results
            client,
            id: "trello card no results",
            channel: message.channel,
            message: "No results!",
            emoji: "x"
        });
        let board = data[1]["200"];
        let lists = data[2]["200"].filter(l => l.id === card.idList)[0].name;
        let members = data[3]["200"].filter(m => card.idMembers.includes(m.id)).map(m => m.fullName).join(", ");
        let labels = card.labels.map(l => l.name).join(", ");

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor(`${card.name} on ${board.name}`, "http://www.stickpng.com/assets/images/58482beecef1014c0b5e4a36.png", card.url)
            .setDescription(card.desc)
            .setColor(board.prefs.backgroundColor)
            .addField("List", lists)
            .setFooter(`Card ID: ${card.id} (${card.shortLink})`);

        if (labels) embed.addField("Labels", labels);
        if (members) embed.addField("Members", members);

        return embed;
    }
};