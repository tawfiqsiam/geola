module.exports = async (client, clientSecret) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);

    //Get user data
    let userData = await models.users.findOne({ clientSecret });
    if (!userData) return { error: "Invalid client secret" };
    if (!userData.translator) userData.translator = {};
    const user = client.users.get(userData._id) || await client.fetchUser(userData._id);

    //Blacklisted
    if (userData.translator.blacklisted) return { error: "Blacklisted" };
    if (await _.blacklisted(client, (client.users.get(userData._id) || await client.fetchUser(userData._id)))) return { error: "Blacklisted", notifications: userData.translator.notifications };

    //Terms not accepted
    if (!userData.translator.acceptedTerms) return { error: "Terms not accepted" };

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //No languages
    if ((!userData.translator.languages) || (!userData.translator.languages.length)) return { error: "No languages", validLanguages };

    //Tutorial not finished
    if (!userData.translator.finishedTutorial) return {
        error: "Tutorial not finished",
        userTag: `${user.username}#${user.discriminator}`,
        languages: validLanguages.filter(l => userData.translator.languages.includes(l.name))
    };

    //Get phrase
    let phrase = await models.translations.find(
        userData.translator.nextTranslation ?
            { _id: userData.translator.nextTranslation } :
            {
                $and: [
                    {
                        $or: [
                            {
                                translations: { $exists: false }
                            },
                            {
                                $expr: {
                                    $lt: [
                                        {
                                            $size: {
                                                $setIntersection: ["$translations.language", userData.translator.languages]
                                            }
                                        },
                                        userData.translator.languages.length
                                    ]
                                }
                            },
                            {
                                $expr: {
                                    $gte: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: "$translations",
                                                    cond: {
                                                        $and: [
                                                            {
                                                                $in: ["$$this.language", userData.translator.languages]
                                                            },
                                                            {
                                                                $eq: ["$$this.proposedTranslation", null]
                                                            },
                                                            {
                                                                $lte: ["$$this.lastEdit", "$lastEdit"]
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        1
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        $or: [
                            { varCount: 0, vars: null },
                            {
                                $and: [
                                    { vars: { $exists: true } },
                                    {
                                        $expr: {
                                            $eq: [{ $size: "$vars" }, "$varCount"]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
    );

    //No translations needed
    if (!phrase.length) return { error: "No translations needed", notifications: userData.translator.notifications };

    //Get needed languages
    const neededLanguages = userData.translator.languages.filter(l => {
        if (!phrase.translations) return true;
        let translation = phrase.translations.find(t => t.language === l);
        return (!translation) || (!translation.lastProposal) || (translation.lastProposal <= phrase.lastEdit);
    });
    delete phrase.translations;

    //Return
    return {
        phrase: phrase[Math.floor(Math.random() * phrase.length)],
        validLanguages,
        userLanguages: validLanguages.filter(l => userData.translator.languages.includes(l.name)),
        neededLanguages: validLanguages.filter(l => neededLanguages.includes(l.name)),
        notifications: userData.translator.notifications,
        lastNotificationsCheck: userData.translator.lastNotificationsCheck
    };
};