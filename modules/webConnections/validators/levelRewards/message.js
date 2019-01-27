module.exports = (client, { id, data: message }, { server }) => {

    //Over 2000 chars
    if (message.length > 2000) return;

    //Get level reward
    const levelReward = server.data.levelRewards.find(lr => lr.level === id);

    //Remove message
    if (message === "") return levelReward.message = undefined;

    //Set message
    levelReward.message = message;
};