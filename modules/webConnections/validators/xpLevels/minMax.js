module.exports = (client, minMax, { server }) => {

    //No min/max provided
    if ((isNaN(minMax[0])) || (minMax[0] === null) || (isNaN(minMax[1])) || (minMax[1] === null)) return;

    //Over 50
    if ((minMax[0] > 50) || (minMax[1] > 50)) return;

    //Min is more than max
    if (minMax[0] > minMax[1]) return;

    //Prepare xp object
    if (!server.data.xp) server.data.xp = {};

    //Remove min/max
    if (isNaN(minMax[0])) server.data.xp.min = undefined;
    if (isNaN(minMax[1])) server.data.xp.max = undefined;

    //Set min/max
    if (!isNaN(minMax[0])) server.data.xp.min = minMax[0];
    if (!isNaN(minMax[1])) server.data.xp.max = minMax[1];
};