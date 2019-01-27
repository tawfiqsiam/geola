module.exports = async (client, refreshToken) => {

    //Pre Module
    const btoa = require("btoa");
    const fetch = require("node-fetch");

    //Get tokens
    const credentials = btoa(`${client.user.id}:${process.env.CLIENT_SECRET}`);
    const tokens = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=http://localhost/geola/auth`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`
        }
    });

    //Return
    return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token
    };
};