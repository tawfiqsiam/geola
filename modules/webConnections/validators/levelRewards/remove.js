module.exports = (client, level, { server }) => {

    //Get level reward
    const levelReward = server.data.levelRewards.find(lr => lr.level === level);

    //Level reward doesnt exist
    if (!levelReward) return;

    //Remove level reward
    server.data.levelRewards.splice(server.data.levelRewards.indexOf(levelReward), 1);
};