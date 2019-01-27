module.exports = {

    parse: (client, message, data) => {

        data = data.split("/b/");
        if (data.length === 2) data = data[1];
        else data = data.join("");
        data = data.split("/")[0];

        return {
            board: data
        };
    },

    fetch: async data => {

        //Modules
        const fetch = require("node-fetch");

        //Fetch + return
        return await fetch(`https://api.trello.com/1/batch?urls=/boards/${data.board},/boards/${data.board}/cards,/boards/${data.board}/lists,/boards/${data.board}/labels&key=${process.env.TRELLO_API_KEY}`);
    },

    buildEmbed: (client, message, data) => {

        //Pre Module
        const { Discord, _ } = client.modules.misc.preModule(client);

        //No board
        if (data[0].message === "invalid id") return _.send({
            client,
            id: "trello board no board",
            channel: message.channel,
            message: "That Board doesn't exist!",
            emoji: "x"
        });

        //Missing perms
        if (data[0].message === "unauthorized permission requested") return _.send({
            client,
            id: "trello board missing perms",
            channel: message.channel,
            message: "I don't have permission to access that Board! Make sure that it's public",
            emoji: "x"
        });

        //Parse data
        let board = data[0]["200"];
        let cards = data[1]["200"];
        let lists = data[2]["200"];
        let labels = data[3]["200"];

        //Embed
        let embed = new Discord.RichEmbed()
            .setAuthor(board.name, "http://www.stickpng.com/assets/images/58482beecef1014c0b5e4a36.png", board.url)
            .setColor(board.prefs.backgroundColor)
            .addField("Lists", lists.length, true)
            .addField("Cards", cards.length, true)
            .addField("Labels", labels.length, true)
            .addField("Viewing Permissions", `${board.prefs.permissionLevel[0].toUpperCase()}${board.prefs.permissionLevel.slice(1)}`, true)
            .addField("Comment Permissions", `${board.prefs.comments[0].toUpperCase()}${board.prefs.comments.slice(1)}`, true)
            .setFooter(`Board ID: ${board.id} (${board.shortUrl.split("/b/")[1]})`);

        return embed;
    }
};