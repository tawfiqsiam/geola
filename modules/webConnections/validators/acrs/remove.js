module.exports = (client, trigger, { server }) => {

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === trigger);

    //ACR doesnt exist
    if (!acr) return;

    //Remove acr
    server.data.acrs.splice(server.data.acrs.indexOf(acr), 1);
};