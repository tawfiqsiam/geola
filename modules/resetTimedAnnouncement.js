module.exports = async (client, message) => {

    //Pre Module
    const { _ } = client.modules.misc.preModule(client);
    const serverData = message.guild.data;

    //Check perms
    if (!message.member.hasPermission("MANAGE_GUILD")) return;

    //Get command params
    let send = message.content.split(" ").slice(1).join(" ").toLowerCase().replace(/\s+/g, "") === "send";

    //TA not setup
    if (
        !serverData.timedAnnouncement ||
        !serverData.timedAnnouncement.channel ||
        !serverData.timedAnnouncement.message ||
        !serverData.timedAnnouncement.interval
    ) return _.send({
        client,
        id: "resetta ta not setup",
        channel: message.channel,
        message: "Timed Announcements aren't setup on this server!",
        emoji: "x"
    });

    //Send TA message
    const channel = message.guild.channels.get(serverData.timedAnnouncement.channel);
    if ((send) && (channel)) channel.send(serverData.timedAnnouncement.message);

    //Set new timestamp
    serverData.timedAnnouncement.timestamp = Date.now() + serverData.timedAnnouncement.interval;

    //Send
    _.send({
        client,
        id: "resetta reset",
        channel: message.channel,
        message: "The Timed Announcements timer has been reset!",
        emoji: "white_check_mark"
    });
};