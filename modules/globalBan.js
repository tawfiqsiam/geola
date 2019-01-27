module.exports = async (client, message) => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Restrict command
    if (message.author.id !== client.apixel.id) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let action = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let target = PARAMS.slice(2, 3).join(" ").replace(/[<>@!]/g, "");
    let reason = PARAMS.slice(3).join(" ");

    //Invalid action
    if (!["add", "remove"].includes(action)) return message.channel.send(":x:  **|  Invalid action!**");

    //No target
    if (target === "") return message.channel.send(":x:  **|  You must provide a user!**");

    //No reason
    if ((action === "add") && (reason === "")) return message.channel.send(":x:  **|  You must provide a reason!**");

    //Get data
    const data = await models.data.findOne();

    const globalBanned = data.globalBans.find(b => b.user === target);
    if (action === "add") {

        //Already global banned
        if ((action === "add") && (globalBanned)) return message.channel.send(":x:  **|  That user is already global banned!**");

        //Add
        data.globalBans.push({ user: target, reason });
    }
    else {

        //Not global banned
        if ((action === "remove") && (!globalBanned)) return message.channel.send(":x:  **|  That user isn't global banned!**");

        //Remove
        data.globalBans.splice(data.globalBans.indexOf(globalBanned), 1);
    }

    //Save doc
    data.save();

    //Send
    message.channel.send(`:white_check_mark:  **|  ${action === "add" ? "Added" : "Removed"} global ban!**`);
};