module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Pre command
    if (!await _.preCommand(client, message, "Warnings", 2000)) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let target = PARAMS.slice(1, 2).join(" ").replace(/[<>@!]/g, "");
    let page = PARAMS.slice(2).join(" ");

    //Parse params
    if (target === "") {
        target = message.author.id;
        page = 1;
    }
    if (page === "") page = 1;
    let fetchedTarget = await _.promise(message.guild.fetchMember(target), true);
    if (!fetchedTarget) {
        page = target;
        target = message.author.id;
    }
    else target = fetchedTarget;
    page = parseInt(page);

    //Parse user
    target = target.user || (await message.guild.fetchMember(target)).user;

    //Get data
    const data = target.id === message.author.id ?
        message.member.data :
        await models.members.findById({ server: message.guild.id, user: target.id });

    //Build warnings
    const number = 10 * (page - 1);
    let thisNumber = number;
    let warnings = "";
    for (let i = number; i < number + 10; i++) {

        thisNumber = thisNumber + 1;

        if (data.warnings[i] !== undefined) warnings = `${warnings}\n**${thisNumber}.** ${data.warnings[i] === "" ? "*No reason specified*" : data.warnings[i]}`;
    }

    //No warnings
    if (data.warnings.length === 0) warnings = "*No warnings! Lookin' clean!*";

    //Page too high
    if (warnings === "") return _.send({
        client,
        id: "warnings page too high",
        channel: message.channel,
        message: "You don't have that many warnings! Try a lower page number",
        emoji: "x"
    });

    //Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`${target.tag}'s Warnings`, target.displayAvatarURL)
        .setDescription(warnings)
        .setColor(await _.getColor(target.displayAvatarURL))
        .setTimestamp();

    //Send
    message.channel.send(embed);

    //Post command
    await _.postCommand(client, message, "Warnings");
};