module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    //Delete command message
    await message.delete();

    //Get command params
    const PARAMS = message.content.split(" ");
    let amount = parseInt(PARAMS.slice(1, 2).join(" "));
    let filter = PARAMS.slice(2).join(" ");
    let filterType = null;
    let messages = [];

    //Check amount
    if ((amount < 1) || (isNaN(amount))) return;
    if (amount > 100) amount = 100;

    //Get filter type
    if (filter.includes("&")) {
        //Role

        filter = filter.replace(/[<>@&]/g, "");
        filterType = "role";
    }
    else if (filter.includes("@")) {
        //User

        filter = filter.replace(/[<>@!]/g, "");
        filterType = "user";
    }
    else if (filter !== "") { //Clear off no filtering
        //ID or Name

        let test = await _.promise(message.guild.fetchMember(filter.replace(/[^0-9]/g, "")), true); //Test for user

        if (test) {
            filter = test.id;
            filterType = "user";
        }
        else {
            test = _.findRole(message.guild, filter); //Test for role

            if (test) {
                filter = test.id;
                filterType = "role";
            }
        }
    }

    //Fetch messages
    messages = await message.channel.fetchMessages({ limit: amount });

    //Filter
    if (filterType === "user") messages = messages.array().filter(m => m.author.id === filter).map(m => m.id); //user
    else if (filterType === "role") messages = messages.array().filter(m => m.member.roles.has(filter)).map(m => m.id); //role

    //Prune
    let pruned = await _.promise(message.channel.bulkDelete(messages, true), true);

    if (pruned) await _.stats(client, "Pruned", pruned.size); //pruned, stats
    else _.send({ //missing perms
        client,
        id: "prune missing perms",
        channel: message.channel,
        message: "I don't have permission to prune messages! You can fix this by giving me the Manage Messages or Administrator permission",
        emoji: "x"
    });
};