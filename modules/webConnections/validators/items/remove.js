module.exports = async (client, name, { server }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get item
    const item = server.data.items.find(i => i === name);

    //Item doesnt exist
    if (!item) return;

    //Remove item
    server.data.items.splice(server.data.items.indexOf(item), 1);

    //Remove from shops
    server.data.shops.forEach(s => {
        let item = s.items.find(i => i.name === name);
        if (item) s.items.splice(s.items.indexOf(item), 1);
    });

    //Remove from member invs
    const members = await models.members.find({ "_id.server": server.id, "inv.name": name });
    let memberDocSaves = [];
    members.forEach(m => {
        m.inv.splice(m.inv.indexOf(m.inv.find(i => i.name === name)), 1);
        memberDocSaves.push(_.save(client, m));
    });
    await Promise.all(memberDocSaves);
};