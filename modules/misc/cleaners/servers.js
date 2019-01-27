module.exports = (client, doc) => {

    //Get server
    const server = client.guilds.get(doc._id);

    //Autoroles
    const autoroles = doc.autoroles;
    doc.autoroles = [];
    autoroles.forEach(a => {
        if (server.roles.get(a)) doc.autoroles.push(a);
    });

    //Mute role
    if (!server.roles.get(doc.muteRole)) doc.muteRole = undefined;

    //Welcome channel
    if (!server.channels.get(doc.welcomeChannel)) doc.welcomeChannel = undefined;

    //Leave channel
    if (!server.channels.get(doc.leaveChannel)) doc.leaveChannel = undefined;

    //Level rewards
    doc.levelRewards.forEach(lr => {

        //Add roles
        const addRoles = lr.addRoles;
        lr.addRoles = [];
        addRoles.forEach(r => {
            if (server.roles.get(r)) lr.addRoles.push(r);
        });

        //Remove roles
        const removeRoles = lr.removeRoles;
        lr.removeRoles = [];
        removeRoles.forEach(r => {
            if (server.roles.get(r)) lr.removeRoles.push(r);
        });
    });

    //Shops
    doc.shops.forEach(s => {

        let items = s.items;
        s.items = [];
        items.forEach(i => {
            if (i.itemType === "item") s.items.push(i);
            else if (server.roles.get(i.name)) s.items.push(i);
        });
    });

    //Self roles
    const selfRoles = doc.selfRoles;
    doc.selfRoles = [];
    selfRoles.forEach(a => {
        if (server.roles.get(a)) doc.selfRoles.push(a);
    });

    //Temporary roles
    const temporaryRoles = doc.temporaryRoles;
    doc.temporaryRoles = [];
    temporaryRoles.forEach(tr => {
        if (server.roles.get(tr.role)) doc.temporaryRoles.push(tr);
    });

    //Timed announcement
    if ((doc.timedAnnouncement) && (!server.channels.get(doc.timedAnnouncement.channel))) doc.timedAnnouncement.channel = undefined;

    //ACRs
    doc.acrs.forEach(a => {

        //Whitelisted channels
        const whitelistedChannels = a.whitelistedChannels;
        a.whitelistedChannels = [];
        whitelistedChannels.forEach(r => {
            if (server.roles.get(r)) a.whitelistedChannels.push(r);
        });

        //Blacklisted channels
        const blacklistedChannels = a.blacklistedChannels;
        a.blacklistedChannels = [];
        blacklistedChannels.forEach(r => {
            if (server.roles.get(r)) a.blacklistedChannels.push(r);
        });

        //Whitelisted roles
        const whitelistedRoles = a.whitelistedRoles;
        a.whitelistedRoles = [];
        whitelistedRoles.forEach(r => {
            if (server.roles.get(r)) a.whitelistedRoles.push(r);
        });

        //Blacklisted roles
        const blacklistedRoles = a.blacklistedRoles;
        a.blacklistedRoles = [];
        blacklistedRoles.forEach(r => {
            if (server.roles.get(r)) a.blacklistedRoles.push(r);
        });

        //Add roles
        const addRoles = a.addRoles;
        a.addRoles = [];
        addRoles.forEach(r => {
            if (server.roles.get(r)) a.addRoles.push(r);
        });

        //Remove roles
        const removeRoles = a.removeRoles;
        a.removeRoles = [];
        removeRoles.forEach(r => {
            if (server.roles.get(r)) a.removeRoles.push(r);
        });
    });
};