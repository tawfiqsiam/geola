module.exports = (client, timedAnnouncementInterval, { server }) => {

    //Over 31536000000 ms (1 year)
    if (timedAnnouncementInterval > 31536000000) return;

    //Prepare timed announcement object
    if (!server.data.timedAnnouncement) server.data.timedAnnouncement = {};

    //Remove timed announcement interval
    if ((isNaN(timedAnnouncementInterval)) || (timedAnnouncementInterval === null)) return server.data.timedAnnouncement.interval = undefined;

    //Set timed announcement interval
    server.data.timedAnnouncement.interval = timedAnnouncementInterval;
};