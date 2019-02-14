module.exports = async (client, code) => {

    //Pre Module
    const { models, _ } = client.modules.misc.preModule(client);
    const btoa = require("btoa");
    const fetch = require("node-fetch");

    //Get access + refresh token
    const credentials = btoa(`${client.user.id}:${process.env.CLIENT_SECRET}`);
    let result = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=http://geolabot.com/auth`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`
        }
    });
    result = await result.json();
    const accessToken = result.access_token;
    const refreshToken = result.refresh_token;

    //Get userID
    result = await fetch("https://discordapp.com/api/v6/users/@me", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const userID = JSON.parse(await result.text()).id;

    //Get user data
    const userData = await models.users.findByIdAndUpdate(userID, {}, { upsert: true, setDefaultsOnInsert: true, new: true });

    //Generate + save client secret
    const clientSecret = await _.generateClientSecret(client);
    userData.clientSecret = clientSecret;
    userData.accessToken = accessToken;
    userData.refreshToken = refreshToken;
    await _.save(client, userData);

    //Return
    return clientSecret;
};