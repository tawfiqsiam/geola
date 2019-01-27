module.exports = (client, trigger, { server }) => {

    //Trigger in use
    if (server.data.acrs.find(a => a.trigger === trigger)) return;

    //Add acr
    server.data.acrs.push({ trigger });
};