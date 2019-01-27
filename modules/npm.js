module.exports = async (client, message) => {

    //Pre Module
    const { Discord, _ } = client.modules.misc.preModule(client);
    const fetch = require("node-fetch");

    //Pre command
    if (!await _.preCommand(client, message, "NPM", 3000)) return;

    //Get command params
    let package = message.content.split(" ").slice(1).join(" ");

    //No package
    if (package === "") return _.send({
        client,
        id: "npm no package",
        channel: message.channel,
        message: "Which package would you like to lookup?",
        emoji: "x"
    });

    //Fetch
    let data = await fetch(`https://registry.npmjs.com/${package}`);
    data = await data.json();

    //No results
    if (data.hasOwnProperty("error")) return _.send({
        client,
        id: "npm no results",
        channel: message.channel,
        message: "I couldn't find anything about that package!",
        emoji: "x"
    });

    //Unpublished
    if (data.time.hasOwnProperty("unpublished")) return _.send({
        client,
        id: "npm unpublished",
        channel: message.channel,
        message: "That package isn't published!",
        emoji: "x"
    });

    //Parse: Keywords
    if (!data.hasOwnProperty("keywords")) data.keywords = [];

    data.keywords.forEach((kw, i) => data.keywords[i] = `${kw.charAt(0).toUpperCase()}${kw.slice(1)}`);

    data.keywords = data.keywords.length > 0 ? `Keywords: ${data.keywords.join(", ")}` : "";

    //Parse: Repo URL
    if (data.hasOwnProperty("repository")) {
        if (data.repository.url.includes("+")) data.repository.url = data.repository.url.split("+")[1];
        if (data.repository.url.includes("@")) data.repository.url = `https://${data.repository.url.split("@")[1]}`;
        if (data.repository.url.startsWith("git://")) data.repository.url = `${data.repository.url.replace(/git:\/\//, "https://")}`;
    }

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`NPM: ${data.name}`, "https://raw.githubusercontent.com/npm/logos/master/npm%20square/n-64.png", `https://npmjs.com/package/${data.name}`)
        .setDescription(data.description)
        .setColor(0xc12127)
        .addField("Version", data["dist-tags"].latest, true)
        .addField("Author", data.author ? data.author.name : "*Anonymous*", true)
        .addField("License", data.license ? data.license : "*None*", true)
        .setFooter(data.keywords);

    if (data.hasOwnProperty("repository")) embed.addField("Repository", `[${data.repository.url.split("/")[2]}...](${data.repository.url})`, true);
    if (data.hasOwnProperty("homepage")) embed.addField("Website", `[${data.homepage.split("/")[2]}...](${data.homepage})`, true);
    if (data.hasOwnProperty("bugs")) embed.addField("Bugs Page", `[${data.bugs.url.split("/")[2]}...](${data.bugs.url})`, true);

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "NPM");
};