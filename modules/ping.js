module.exports = async (client, message) => {

    //Pre Module
    const { mongoose, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Ping", 2000)) return;

    //Get command params
    let type = message.content.toLowerCase().replace(/\s+/g, "").endsWith("ping") ? "ping" : "pong";

    //Define pings
    const pings = {};

    //Connection to Discord
    pings.websocket = Math.round(client.ping);

    //Message sending
    let start = Date.now();
    let m = await message.channel.send(`:ping_pong:  **|  ${type === "ping" ? "Pinging" : "Ponging"}...**`);
    pings.messages = Date.now() - start;

    //Database ping
    start = Date.now();
    await mongoose.connection.db.admin().ping();
    pings.database = Date.now() - start;

    //Edit message
    m.edit(`:ping_pong:  **|  ${type === "ping" ? "Pong" : "Ping"}!\n\nConnection to Discord: ${pings.websocket} ms\nMessage Sending: ${pings.messages} ms\nDatabase Ping: ${pings.database} ms**`);

    //Post command
    await _.postCommand(client, message, "Ping");
};