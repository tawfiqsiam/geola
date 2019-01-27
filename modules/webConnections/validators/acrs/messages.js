module.exports = (client, { id, data: messages }, { server }) => {

    //Over 2000 chars
    if (messages.find(m => m.length > 2000)) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set messages
    acr.messages = messages;
};