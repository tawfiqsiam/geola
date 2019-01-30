module.exports = async client => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Fetch geolas hub members
    await client.geolasHub.fetchMembers();

    const data = {
        developers: client.developerRole.members.map(m => ({ id: m.id, tag: m.user.tag })),
        supportStaff: client.geolasHub.roles.get("351154399894044673").members.filter(m => m.id !== client.apixel.id).map(m => ({ id: m.id, tag: m.user.tag })),
        moderators: client.geolasHub.roles.get("350647287204151296").members.filter(m => m.id !== client.apixel.id).map(m => ({ id: m.id, tag: m.user.tag }))
    };

    //Get suggestors + donators
    const validUsers = client.users.map(u => u.id);
    let users = await models.users.find({
        $and: [{ _id: { $in: validUsers } }, { _id: { $ne: client.apixel.id } }],
        $or: [{ "inv.Donator I Badge": 1 }, { "inv.Suggestor Badge": 1 }]
    });
    data.donators = users.filter(u => u.inv.find(i => i.name === "Donator I Badge")).map(u => ({ id: u._id, tag: client.users.get(u._id).tag }));
    data.suggestors = users.filter(u => u.inv.find(i => i.name === "Suggestor Badge")).map(u => ({ id: u._id, tag: client.users.get(u._id).tag }));

    //Return
    return data;
};