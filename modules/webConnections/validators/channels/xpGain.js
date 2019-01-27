module.exports = (client, { data: xpGain }, { channel }) => {

    //Set xp gain
    channel.data.xpGain = xpGain ? undefined : false;
};