module.exports = (client, leaveChannel, { server }) => {

    //Remove leave channel
    if (leaveChannel === "") return server.data.leaveChannel = undefined;

    //Get channel
    leaveChannel = server.channels.get(leaveChannel);

    //No channel
    if (!leaveChannel) return;

    //Set leave channel
    server.data.leaveChannel = leaveChannel.id;
};