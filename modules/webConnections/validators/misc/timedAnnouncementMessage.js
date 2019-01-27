module.exports = (client, timedAnnouncementMessage, { server }) => {

    //Over 2000 chars
    if (timedAnnouncementMessage.length > 2000) return;

    //Prepare timed announcement object
    if (!server.data.timedAnnouncement) server.data.timedAnnouncement = {};

    //Remove timed announcement message
    if (timedAnnouncementMessage === "") return server.data.timedAnnouncement.message = undefined;

    //Set timed announcement message
    server.data.timedAnnouncement.message = timedAnnouncementMessage;
};