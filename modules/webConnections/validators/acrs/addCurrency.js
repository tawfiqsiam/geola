module.exports = (client, { id, data: addCurrency }, { server }) => {

    //No add currency provided
    if ((isNaN(addCurrency)) || (addCurrency === null)) return;

    //Over 100000000 (100 million)
    if (addCurrency > 100000000) return;

    //Get acr
    const acr = server.data.acrs.find(a => a.trigger === id);

    //Set add currency
    acr.addCurrency = addCurrency;
};