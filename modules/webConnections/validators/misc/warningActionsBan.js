module.exports = (client, warningActionsBan, { server }) => {

    //Over 1000
    if (warningActionsBan > 1000) return;

    //Prepare warning actions object
    if (!server.data.warningActions) server.data.warningActions = {};

    //Remove ban warning action
    if ((isNaN(warningActionsBan)) || (warningActionsBan === null)) return server.data.warningActions.ban = undefined;

    //Set ban warning action
    server.data.warningActions.ban = warningActionsBan;
};