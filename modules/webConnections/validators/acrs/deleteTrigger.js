module.exports = (client, { id, data: deleteTrigger }, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set delete trigger
    acr.deleteTrigger = deleteTrigger ? true : undefined;
};