module.exports = async client => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get all client secrets
    const data = await models.data.findOne();

    //Generate function
    const generate = () => {
        const possible = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890-_.".split("");
        let clientSecret = "";
        for (let i = 0; i < 100; i++) clientSecret = `${clientSecret}${possible[Math.floor(Math.random() * possible.length)]}`;

        if (data.clientSecrets.includes(clientSecret)) clientSecret = generate();

        return clientSecret;
    };

    //Generate client secret
    const generated = generate();

    //Add to all client secrets + save
    data.clientSecrets.push(generated);
    data.save();

    //Return
    return generated;
};