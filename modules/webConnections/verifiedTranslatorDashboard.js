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
    if (await _.blacklisted(client, (client.users.get(userData._id) || await client.fetchUser(userData._id)))) return { error: "Blacklisted" };

    //Not a verified translator
    let member = await _.promise(client.geolasHub.fetchMember(userData._id), true);
    if (((!member) || (!member.roles.has("432635413354643457"))) && (!await _.isDev(client, user))) return { error: "Not a verified translator" };

    //Get valid languages
    const { validLanguages } = await models.data.findOne();

    //Get translations
    let translations = await models.translations.find({
        "translations.language": { $in: userData.translator.languages },
        "translations.pendingProposals": { $gt: 0 }
    });

    //No verification needed
    if (!translations.length) return { error: "No verification needed" };

    //Get needed translations
    const neededTranslations = [];
    translations.forEach(t => {

        t = t.toObject();

        t.translations.forEach(tt => {
            tt.proposedTranslation = tt.proposedTranslations.filter(pt => (!pt.translator) || (!pt.translator.id));
            tt.proposedTranslation = tt.proposedTranslation[Math.floor(Math.random() * tt.proposedTranslation.length)];
            delete tt.proposedTranslations;
            if (tt.proposedTranslation) neededTranslations.push(t);
        });
    });

    //Return
    return {
        translation: neededTranslations[Math.floor(Math.random() * neededTranslations.length)],
        userLanguages: validLanguages.filter(l => userData.translator.languages.includes(l.name)),
    };
};