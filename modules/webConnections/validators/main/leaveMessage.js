module.exports = (client, leaveMessage, { server }) => {

    //Over 2000 chars
    if (leaveMessage.length > 2000) return;

    //Remove welcome message
    if (leaveMessage.trim() === "") return server.data.leaveMessage = undefined;

    //Set leave message
    server.data.leaveMessage = leaveMessage;
};