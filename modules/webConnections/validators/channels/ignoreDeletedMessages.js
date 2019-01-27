module.exports = (client, { data: ignoreDeletedMessages }, { channel }) => {

    //Set ignore deleted messages
    channel.data.ignoreDeletedMessages = ignoreDeletedMessages ? true : undefined;
};