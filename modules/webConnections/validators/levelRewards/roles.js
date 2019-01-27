module.exports = (client, { id, data: roles }, { server }) => {

    //Get level reward
    const levelReward = server.data.levelRewards.find(lr => lr.level === id);

    //Set roles
    levelReward.addRoles = [];
    levelReward.removeRoles = [];
    roles.forEach(r => {
        if (r.data === "add") levelReward.addRoles.push(r.role);
        else if (r.data === "remove") levelReward.removeRoles.push(r.role);
    });
};