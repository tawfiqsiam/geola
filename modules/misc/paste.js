module.exports = async ({ name, description, content }) => {

    //Modules
    const fetch = require("request");

    //Check params
    if (!name) throw new Error("Missing name!");
    if (!description) throw new Error("Missing description!");
    if (!content) throw new Error("Missing content!");

    //Post
    return new Promise(resolve => fetch.post({
        url: "https://api.paste.ee/v1/pastes",
        form: { description, sections: [{ name, syntax: "text", contents: content }] },
        headers: { "X-Auth-Token": process.env.PASTE_TOKEN }
    }, (err, res) => resolve(JSON.parse(res.body).link)));
};