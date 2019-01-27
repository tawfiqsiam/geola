module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const trello = client.modules.trelloProcessors;

    //Pre command
    if (!await _.preCommand(client, message, "Trello", 3000)) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let type = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let data = PARAMS.slice(2).join(" ");

    //No type and data
    if (type === "") return _.send({
        client,
        id: "trello no type and data",
        channel: message.channel,
        message: "You must provide a type and something to search!",
        emoji: "x"
    });

    //Validate type
    if (type === "cards") type = "card";
    if (type === "labels") type = "label";

    if (!["board", "card", "label"].includes(type)) return _.send({
        client,
        id: "trello invalid type",
        channel: message.channel,
        message: "That type doesn't exist!",
        emoji: "x"
    });

    //No data
    if (data === "") return _.send({
        client,
        id: "trello no data",
        channel: message.channel,
        message: "You must provide something to search!",
        emoji: "x"
    });

    //Parse data
    data = trello[type].parse(client, message, data);
    if (data instanceof Promise) return; //error parsing data

    //Fetch
    let result = await trello[type].fetch(data);
    result = await result.json();

    //Build Embed
    let embed = trello[type].buildEmbed(client, message, result, data);
    if (embed instanceof Promise) return; //error building embed

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Trello");
};