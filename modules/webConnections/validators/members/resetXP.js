module.exports = (client, { data: resetXP }, { member }) => {

    //No reset xp
    if (!resetXP) return;

    //Reset xp
    member.data.xp.xp = 0;
    member.data.xp.totalXP = 0;
    member.data.xp.level = 0;
    member.data.xp.cooldown = 0;
};