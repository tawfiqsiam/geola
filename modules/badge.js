module.exports = async (client, message) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Restrict command
    if (!await _.isDev(client, message.author)) return;

    //Get params
    const PARAMS = message.content.split(" ");
    let action = PARAMS.slice(1, 2).join(" ").toLowerCase();
    let target = client.users.get(PARAMS.slice(2, 3).join(" ").replace(/[<>@!]/g, ""));
    let badge = PARAMS.slice(3).join(" ").toLowerCase().replace(/\s+/g, "");

    //Invalid action
    if (!["add", "remove"].includes(action)) return message.channel.send(":x:  **|  Invalid action!**");

    //No user
    if (!target) return message.channel.send(":x:  **|  I couldn't find that user!**");

    //Parse badge
    const badges = {
        "Geola I": ["geolai", "geola1"],
        "Geola II": ["geolaii", "geola2"],
        "Geola III": ["geolaiii", "geola3"],
        "Geola IV": ["geolaiv", "geola4"],
        "Geola V": ["geolav", "geola5"],
        "Developer": ["developer", "dev"],
        "Beta Tester": ["betatester", "betatest", "beta", "tester", "test"],
        "Hall of Fame": ["halloffame", "hof"],
        "VIP": ["veryimportantperson", "vip"],
        "Donator I": ["donatori", "donator1", "donori", "donor1"],
        "Donator II": ["donatorii", "donator2", "donorii", "donor2"],
        "Donator III": ["donatoriii", "donator3", "donoriii", "donor3"],
        "Donator IV": ["donatoriv", "donator4", "donoriv", "donor4"],
        "Donator V": ["donatorv", "donator5", "donorv", "donor5"],
        "Suggestor": ["suggestor", "suggest"],
        "Bug Hunter": ["bughunter", "bug", "bugh", "bhunter"],
        "Banhammer": ["banhammer", "ban"],
        "Bruise": ["bruise", "kicked"],
        "Shoe": ["shoe", "kick"],
        "Log I": ["logi", "log1"],
        "Log II": ["logii", "log2"],
        "Log III": ["logiii", "log3"],
        "Log IV": ["logiv", "log4"],
        "Log V": ["logv", "log5"],
        "Log VI": ["logvi", "log6"],
        "Log VII": ["logvii", "log7"],
        "Money I": ["moneyi", "money1"],
        "Money II": ["moneyii", "money2"],
        "Money III": ["moneyiii", "money3"],
        "Money IV": ["moneyiv", "money4"],
        "Money V": ["moneyv", "money5"],
        "You Really Like Yourself, Huh?": ["youreallylikeyourselfhuh", "likeyourself", "self"],
        "Badge": ["badge", "badgebadge"],
        "Lucky I": ["luckyi", "lucky1"],
        "Lucky II": ["luckyii", "lucky2"],
        "Lucky III": ["luckyiii", "lucky3"],
        "Translator": ["translator"],
        "Verified Translator": ["verifiedtranslator", "vtranslator", "translatorverified", "translatorv"]
    };

    let badgeValid = false;
    for (let b in badges) if (badges[b].includes(badge)) {
        badge = b;
        badgeValid = true;
        break;
    }

    //Invalid badge
    if (!badgeValid) return message.channel.send(":x:  **|  Invalid Badge!**");

    //Get user data
    target.data = await models.users.findById(target.id);

    //User already has badge
    if ((action === "add") && (target.data.inv.find(i => i.name === `${badge} Badge`))) return message.channel.send(":x:  **|  That user already has that Badge!**");

    //User doesnt have badge
    if ((action === "remove") && (!target.data.inv.find(i => i.name === `${badge} Badge`))) return message.channel.send(":x:  **|  That user doesn't have that Badge!**");

    //Add/remove badge
    await _.badge({
        client,
        action,
        user: target,
        name: badge
    });

    await _.save(client, target.data);

    //Send
    message.channel.send(`:white_check_mark:  **|  ${action === "add" ? "Added" : "Removed"} the ${badge} Badge ${action === "add" ? "to" : "from"} ${target}!**`);
};