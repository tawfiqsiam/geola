module.exports = (server, value) => {

    //Parse value
    value = value.replace(/[<>#]/g, "").toLowerCase().replace(/\s+/g, "");
    let channel;

    //No value
    if (value === "") return null;

    //ID
    channel = server.channels.get(value);
    if (channel) return channel;

    //Name
    channel = server.channels.find(c => c.name.toLowerCase().replace(/\s+/g, "") === value);
    if (channel) return channel;

    //Name starts with
    channel = server.channels.find(c => c.name.toLowerCase().replace(/\s+/g, "").startsWith(value));
    if (channel) return channel;

    //Name includes
    channel = server.channels.find(c => c.name.toLowerCase().replace(/\s+/g, "").includes(value));
    if (channel) return channel;

    //No channel
    return null;
};