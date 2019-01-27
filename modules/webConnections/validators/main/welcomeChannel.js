module.exports = (client, welcomeChannel, { server }) => {

    //Remove welcome channel
    if (welcomeChannel === "") return server.data.welcomeChannel = undefined;

    //Get channel
    welcomeChannel = server.channels.get(welcomeChannel);

    //No channel
    if (!welcomeChannel) return;

    //Set welcome channel
    server.data.welcomeChannel = welcomeChannel.id;
};