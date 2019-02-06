module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return { error: "Invalid client secret" };
    if (!userData.translator) userData.translator = {};

    //Blacklisted
    if (userData.translator.blacklisted) return { error: "Blacklisted" };
    if (await _.blacklisted(client, (client.users.get(userData._id) || await client.fetchUser(userData._id)))) return { error: "Blacklisted" };

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return { error: "Terms not accepted" };

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //No languages
    if ((!userData.translator.languages) || (!userData.translator.languages.length)) return { error: "No languages", validLanguages };

    //Get phrase
    let phrase = await models.translations.findOne(
        userData.translator.nextTranslation ?
            { _id: userData.translator.nextTranslation } :
            {
                "translations.language": { $nin: userData.translator.languages },
                $expr: { vars: { $size: "$varCount" } }
            },
        `english ${userData.translator.languages.join(" ")}`,
        { lean: true }
    );

    //Return
    return {
        phrase,
        languages: validLanguages.filter(l => userData.translator.languages.includes(l.name)),
        notifications: userData.translator.notifications,
        lastNotificationsCheck: userData.translator.lastNotificationsCheck
    };
};