module.exports = async (client, message, useLatest) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);
    const JSON5 = require("json5");

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params

    /*
     * g#dbquery servers
     * {
     *     _id: "318467989655781389"
     * }
     * prefix modPrefix
     */

    let collection, query, projections;
    if (!useLatest) {
        const PARAMS = message.content.replace(/\n/g, " ").split(" ").slice(1);
        collection = PARAMS[0];
        query = PARAMS.slice(1).join(" ").split("}");
        query = query.slice(0, query.length - 1).join("}");
        if (query !== "") {
            query = `${query}}`;
            query = query
                .replace(/{server}/gi, message.guild.id)
                .replace(/{channel}/gi, message.channel.id)
                .replace(/{apixel}/gi, client.apixel.id)
                .replace(/{geola}/gi, client.user.id);
            query = JSON5.parse(query);
            projections = PARAMS.join(" ").split("}");
            projections = projections[projections.length - 1].trim();
        }
        else {
            query = {};
            projections = PARAMS.slice(1).join(" ");
        }
    }
    else ({ collection, query, projections } = client.latestQuery);

    //Invalid collection
    if (!models.hasOwnProperty(collection)) return message.channel.send(":x:  **|  That collection doesn't exist!**");

    //Query
    let data = await models[collection].find(query, projections);

    //Set latest query
    client.latestQuery = { collection, query, projections };

    //Build output
    let output = "";
    data.forEach((doc, i) => output = `${output}\n\n${i + 1}. ${JSON.stringify(doc, null, 4)}`);
    output = `**Result:**\n\`\`\`json\n${output}\`\`\``;

    //Send
    if (output.length <= 2000) message.channel.send(output);
    else {

        console.log(data);

        message.channel.send(":warning:  **|  The result is over 2,000 characters and has been logged to the console!**");
    }
};