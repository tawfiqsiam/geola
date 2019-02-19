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
    if (await _.blacklisted(client, user)) return { error: "Blacklisted" };

    //Not a dev
    if (!await _.isDev(client, user)) return { error: "Not a dev" };

    //Get translations
    let translations = await models.translations.find({
        translations: { $exists: true },
        $expr: {
            $gte: [
                {
                    $size: {
                        $filter: {
                            input: "$translations",
                            cond: {
                                $ifNull: ["$$this.proposedTranslation.translator", false]
                            }
                        }
                    }
                },
                1
            ]
        }
    });

    //No verification needed
    if (!translations.length) return { error: "No verification needed" };

    //Get random translation
    let translation = translations[Math.floor(Math.random() * translations.length)].toObject();
    translation.translation = translation.translations.filter(t => (t.proposedTranslation) && (t.proposedTranslation.translator));
    translation.translation = translation.translation[Math.floor(Math.random() * translation.translation.length)];

    //Return
    return { translation };
};