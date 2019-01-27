module.exports = (server, value) => {

    //Parse value
    value = value.toLowerCase();
    let id = value.replace(/[<>]/g, "").split(":").slice(2).join("");
    let emoji;

    //No value
    if (value === "") return null;

    //ID
    emoji = server.emojis.get(id);
    if (emoji) return emoji;

    //Name
    emoji = server.emojis.find(e => e.name.toLowerCase() === value);
    if (emoji) return emoji;

    //Name starts with
    emoji = server.emojis.find(e => e.name.toLowerCase().startsWith(value));
    if (emoji) return emoji;

    //Name includes
    emoji = server.emojis.find(e => e.name.toLowerCase().includes(value));
    if (emoji) return emoji;

    //No emoji
    return null;
};