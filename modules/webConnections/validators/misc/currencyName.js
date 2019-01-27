module.exports = (client, currencyName, { server }) => {

    //No currency name provided
    if (currencyName === "") return;

    //Over 100 chars
    if (currencyName.length > 100) return;

    //Set currency name
    server.data.currencyName = currencyName;
};