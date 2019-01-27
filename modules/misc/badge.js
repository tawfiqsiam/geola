module.exports = async ({ client, action, user, name }) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Check params
    if (!client) throw new Error("Missing client!");
    if (!action) throw new Error("Missing action!");
    if (!user) throw new Error("Missing user!");
    if (!name) throw new Error("Missing name!");

    //Parse name
    name = `${name} Badge`;

    //Get user data
    user.data = user.data || await models.users.findById(user.id);

    //Do the vamos
    if (action === "add") {
        //Add

        if (user.data.inv.hasOwnProperty(name)) return;

        user.data.inv[name] = 1;

        if (!user.data.get("badgeAlertsDisabled")) user.send( //notify
            `:white_flower:  **|  You have earned the ${name}! If you no longer wish to receive badge alerts, say \`g!badgealerts disable\`**`
        );

        await _.stats(client, "Badges Collected"); //stats
    }
    else delete user.data.inv[name]; //Remove
};