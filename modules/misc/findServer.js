module.exports = (client, value) => {

    //Parse value
    value = value.toLowerCase().replace(/\s+/g, "");
    let server;

    //No value
    if (value === "") return null;

    //ID
    server = client.guilds.get(value);
    if (server) return server;

    //Name
    server = client.guilds.find(g => g.name.toLowerCase().replace(/\s+/g, "") === value);
    if (server) return server;

    //Name starts with
    server = client.guilds.find(g => g.name.toLowerCase().replace(/\s+/g, "").startsWith(value));
    if (server) return server;

    //Name includes
    server = client.guilds.find(g => g.name.toLowerCase().replace(/\s+/g, "").includes(value));
    if (server) return server;

    //No server
    return null;
};