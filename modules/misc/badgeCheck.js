module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Get user data
    let user = message.author.data;

    //Update commands used stat
    user.stats.commandsUsed = user.stats.commandsUsed + 1 || 1;

    //Geola badges
    let geolaBadges = {
        "1": "Geola I",
        "20": "Geola II",
        "50": "Geola III",
        "100": "Geola IV",
        "200": "Geola V",
        "500": "Geola VI",
        "1000": "Geola VII"
    };

    if (geolaBadges.hasOwnProperty(user.stats.commandsUsed)) await _.badge({
        client,
        action: "add",
        user: message.author,
        name: geolaBadges[user.stats.commandsUsed]
    });

    //Lucky badges
    if (!user.inv.hasOwnProperty("Lucky I Badge")) {
        if (Math.floor(Math.random() * 99) + 1 === 1) await _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Lucky I"
        });
    }
    else if (!user.inv.hasOwnProperty("Lucky II Badge")) {
        if (Math.floor(Math.random() * 999) + 1 === 1) await _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Lucky II"
        });
    }
    else if (!user.inv.hasOwnProperty("Lucky III Badge")) {
        if (Math.floor(Math.random() * 9999) + 1 === 1) await _.badge({
            client,
            action: "add",
            user: message.author,
            name: "Lucky III"
        });
    }
};