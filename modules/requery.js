module.exports = async (client, message) => {

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //No query
    if (!client.latestQuery) return message.channel.send(":x:  **|  You haven't queried the database yet!**");

    //DBQuery
    client.modules.dbquery(client, message, true);
};