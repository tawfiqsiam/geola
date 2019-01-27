module.exports = (client, level, { server }) => {

    //Level in use
    if (server.data.levelRewards.find(lr => lr.level === level)) return;

    //Add level rewards
    server.data.levelRewards.push({ level });
};