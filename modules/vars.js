module.exports = async (client, message) => {

    //Pre Module
    const { Discord, models, _ } = client.modules.misc.preModule(client);

    //Check perms
    if (!await _.isDev(client, message.author)) return;

    //Get command params
    let phrase = message.content.split(" ").slice(1).join(" ");
    if (phrase === "") phrase = null;

    //Get translation data
    const translationData = await models.translations.findOne(
        phrase ?
            { _id: phrase } :
            {
                varCount: { $gt: 0 },
                $or: [
                    {
                        vars: { $exists: false }
                    },
                    {
                        vars: { $exists: true },
                        $expr: {
                            $ne: [{ $size: "$vars" }, "$varCount"]
                        }
                    }
                ]
            }
    );
    if (!translationData) return message.channel.send(":x:  **|  That phrase doesn't exist!**");

    //Parse vars
    let variables = (translationData.english.match(/{VAR.}/g) || []).map(v => parseInt(v.replace(/[^0-9]/g, "")));
    variables = [...new Set(variables)];
    variables = variables.map(v => `${v}: ${(translationData.vars.find(vv => vv.number === v) && translationData.vars.find(vv => vv.number === v).text) || "*None*"}`).join("\n");

    //No vars
    if (variables === "") variables = "*None*";

    //Embed
    const embed = new Discord.RichEmbed()
        .setTitle(`Variables for "${translationData._id}"`)
        .setDescription(variables)
        .setColor(_.colors.geola);

    //Send
    message.channel.send(embed);
};