module.exports = async (client, user) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    const badges = {
        "1": "Log I Badge",
        "20": "Log II Badge",
        "50": "Log III Badge",
        "100": "Log IV Badge",
        "200": "Log V Badge",
        "500": "Log VI Badge",
        "1000": "Log VII Badge"
    };

    if (badges.hasOwnProperty(user.data.stats.logs)) await _.badge({
        client,
        action: "add",
        user,
        name: badges[user.data.stats.logs]
    });
};