module.exports = (client, { id, data: removeCurrency }, { server }) => {

    //No remove currency provided
    if ((isNaN(removeCurrency)) || (removeCurrency === null)) return;

    //Over 100000000 (100 million)
    if (removeCurrency > 100000000) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set remove currency
    acr.removeCurrency = removeCurrency;
};