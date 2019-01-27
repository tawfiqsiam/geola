module.exports = (client, { data: xpBlacklisted }, { member }) => {

    //Set xp blacklisted
    member.data.xp.blacklisted = xpBlacklisted ? true : undefined;
};