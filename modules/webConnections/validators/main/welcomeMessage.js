module.exports = (client, welcomeMessage, { server }) => {

    //Over 2000 chars
    if (welcomeMessage.length > 2000) return;

    //Remove welcome message
    if (welcomeMessage.trim() === "") return server.data.welcomeMessage = undefined;

    //Set welcome message
    server.data.welcomeMessage = welcomeMessage;
};