module.exports = (client, timedAnnouncementChannel, { server }) => {

    //Prepare timed announcement object
    if (!server.data.timedAnnouncement) server.data.timedAnnouncement = {};

    //Remove timed announcement channel
    if (timedAnnouncementChannel === "") return server.data.timedAnnouncement.channel = undefined;

    //Get channel
    timedAnnouncementChannel = server.channels.get(timedAnnouncementChannel);

    //No channel
    if (!timedAnnouncementChannel) return;

    //Set timed announcement channel
    server.data.timedAnnouncement.channel = timedAnnouncementChannel.id;
};