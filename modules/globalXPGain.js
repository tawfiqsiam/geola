module.exports = async (client, message) => {

    //Pre Module
    const userData = message.author.data;

    //Cooldown not done
    if (userData.xp.cooldown > Date.now()) return;

    //XP gained
    const gain = Math.floor(Math.random() * (50 - 30)) + 30;

    //Add xp
    userData.xp.xp = userData.xp.xp + gain;
    userData.xp.totalXP = userData.xp.totalXP + gain;
    userData.xp.cooldown = Date.now() + 120000;

    //Level up
    const levelUpXP = userData.xp.level * 50 + 200;
    if (userData.xp.xp >= levelUpXP) {
        userData.xp.xp = userData.xp.xp - levelUpXP;
        userData.xp.level = userData.xp.level + 1;
    }
};