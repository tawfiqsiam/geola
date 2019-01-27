module.exports = async (client, message, level) => {

    //Pre Module
    const serverData = message.guild.data;
    const memberData = message.member.data;

    //Get default level up message
    let levelUpMessage = serverData.get("xp") ? serverData.xp.levelUpMessage : null;

    //Get level reward
    let levelReward = serverData.levelRewards.find(lr => lr.level === level);
    if (!levelReward) {
        if (levelUpMessage) message.channel.send(
            levelUpMessage
                .replace(/{@user}/ig, message.author)
                .replace(/{user}/ig, message.author.username)
                .replace(/{level}/ig, level)
        );
        return;
    }

    //Message
    levelUpMessage = levelReward.message || levelUpMessage;
    if (levelUpMessage) message.channel.send(
        levelUpMessage
            .replace(/{@user}/ig, message.author)
            .replace(/{user}/ig, message.author.username)
            .replace(/{level}/ig, level)
    );

    //Add roles
    await message.member.addRoles(levelReward.addRoles).catch(() => { });

    //Remove roles
    await message.member.removeRoles(levelReward.removeRoles).catch(() => { });

    //Add items
    if (levelReward.addItems) levelReward.addItems.forEach(i => memberData.inv[i.name] = memberData.inv[i.name] + i.amount || i.amount);

    //Remove items
    if (levelReward.removeItems) levelReward.removeItems.forEach(i => {
        memberData.inv[i.name] = memberData.inv[i.name] - i.amount;
        if ((isNaN(memberData.inv[i.name])) || (memberData.inv[i.name] <= 0)) delete memberData.inv[i.name];
    });
};