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
    let users = await models.users.find({
        _id: { $ne: client.apixel.id },
        inv: { $elemMatch: { $or: [{ name: "Donator I Badge" }, { name: "Suggestor Badge" }] } }
    });

    data.donators = users.filter(u => u.inv.find(i => i.name === "Donator I Badge")).map(async u => {
        u = client.users.get(u._id) || await client.fetchUser(u._id);
        return { id: u.id, tag: `${u.username}#${u.discriminator}` };
    });
    data.donators = await Promise.all(data.donators);

    data.suggestors = users.filter(u => u.inv.find(i => i.name === "Suggestor Badge")).map(async u => {
        u = client.users.get(u._id) || await client.fetchUser(u._id);
        return { id: u.id, tag: `${u.username}#${u.discriminator}` };
    });
    data.suggestors = await Promise.all(data.suggestors);

    //Return
    return data;
};