module.exports = (client, { data: counting }, { channel }) => {

    //Set counting
    channel.data.counting = counting ? true : undefined;
};