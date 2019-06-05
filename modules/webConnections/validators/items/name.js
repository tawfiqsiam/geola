module.exports = async (client, { id, data: name, allData }, { server }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Name not changed
    if (id === name) return;

    //New name in use
    if (server.data.items.includes(name)) return;

    //Delete old item
    server.data.items.splice(server.data.items.indexOf(id), 1);

    //Add new item
    server.data.items.push(name);
    allData.id = name;

    //Edit name in shops
    server.data.shops.forEach(s => {
        let item = s.items.find(i => i.name === id);
        if (item) item.name = name;
    });

    //Edit name in member invs
    const members = await models.members.find({ "_id.server": server.id, "inv.name": id });
    let memberDocSaves = [];
    members.forEach(m => {
        let item = m.inv.find(i => i.name === id);
        item.name = name;
        memberDocSaves.push(_.save(client, m));
    });
    await Promise.all(memberDocSaves);
};