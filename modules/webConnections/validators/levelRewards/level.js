module.exports = (client, { id, data: level, allData }, { server }) => {

    //No level provided
    if ((isNaN(level)) || (level === null)) return;

    //Level not changed
    if (id === level) return;

    //New level in use
    if (server.data.levelRewards.find(lr => lr.level === level)) return;

    //Get level reward
    const levelReward = server.data.levelRewards.find(lr => lr.level === id);

    //Set level
    levelReward.level = level;
    allData.id = level;
};