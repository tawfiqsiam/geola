module.exports = (client, { id, data: trigger, allData }, { server }) => {

    //Trigger not changed
    if (id === trigger) return;

    //New trigger in use
    if (server.data.acrs.find(a => a.trigger === trigger)) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set trigger
    acr.trigger = trigger;
    allData.id = trigger;
};