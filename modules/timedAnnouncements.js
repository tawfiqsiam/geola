module.exports = async client => {

    //Pre Module
    const { models } = client.modules.misc.preModule(client);

    //Get servers
    const servers = await models.servers.find({
        "timedAnnouncement.channel": { $ne: null },
        "timedAnnouncement.message": { $ne: null },
        "timedAnnouncement.interval": { $ne: null },
        $or: [
            { "timedAnnouncement.timestamp": { $lte: Date.now() } },
            { "timedAnnouncement.timestamp": null }
        ]
    }, "timedAnnouncement");

    //Loop through each server
    for (let s of servers) {

        //Get channel
        const channel = client.channels.get(s.timedAnnouncement.channel);
        if (!channel) continue;

        //Send message
        channel.send(s.timedAnnouncement.message);

        //Set timer
        s.timedAnnouncement.timestamp = Date.now() + s.timedAnnouncement.interval;

        //Save doc
        await _.save(client, s);
    }
};