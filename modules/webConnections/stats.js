module.exports = async client => ({
    servers: client.guilds.size,
    channels: client.channels.size,
    users: client.users.size
});