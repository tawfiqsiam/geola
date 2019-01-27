module.exports = (client, forbiddenWords, { server }) => {

    //Over 2000 chars
    if (forbiddenWords.find(w => w.length > 2000)) return;

    //Set forbidden words
    server.data.forbiddenWords = forbiddenWords;
};