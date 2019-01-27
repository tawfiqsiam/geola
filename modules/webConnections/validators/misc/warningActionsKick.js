module.exports = (client, warningActionsKick, { server }) => {

    //Over 1000
    if (warningActionsKick > 1000) return;

    //Prepare warning actions object
    if (!server.data.warningActions) server.data.warningActions = {};

    //Remove kick warning action
    if ((isNaN(warningActionsKick)) || (warningActionsKick === null)) return server.data.warningActions.kick = undefined;

    //Set kick warning action
    server.data.warningActions.kick = warningActionsKick;
};