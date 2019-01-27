module.exports = async (client, message) => {

    //Pre Module
    const memberData = message.member.data;

    //Cooldown not done
    if (memberData.xp.cooldown > Date.now()) return;

    //XP gain disabled
    if (message.channel.data.xpGain === false) return;

    //XP gain blacklisted
    if (memberData.xp.blacklisted) return;

    //Get settings
    const settings = Object.assign({}, message.guild.data.xp);
    if (!settings.min) settings.min = 30;
    if (!settings.max) settings.max = 50;
    if (!settings.cooldown) settings.cooldown = 120000;

    //XP gained
    const gain = Math.floor(Math.random() * (settings.max - settings.min)) + settings.min;

    //Add xp
    memberData.xp.xp = memberData.xp.xp + gain;
    memberData.xp.totalXP = memberData.xp.totalXP + gain;
    memberData.xp.cooldown = Date.now() + settings.cooldown;

    //Currency sync
    if (settings.currencySync) memberData.currency = memberData.currency + gain;

    //Level up
    const levelUpXP = memberData.xp.level * 50 + 200;
    if (memberData.xp.xp >= levelUpXP) {
        memberData.xp.xp = memberData.xp.xp - levelUpXP;
        memberData.xp.level = memberData.xp.level + 1;

        //Level rewards
        await client.modules.levelRewards(client, message, memberData.xp.level);
    }
};