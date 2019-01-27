module.exports = (client, name, { server }) => {

    //Name in use
    if (server.data.items.includes(name)) return;

    //Add item
    server.data.items.push(name);
};