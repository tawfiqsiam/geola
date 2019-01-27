module.exports = (client, { data: currency }, { member }) => {

    //No currency provided
    if ((isNaN(currency)) || (currency === null)) return;

    //Over 1000000000 (1 billion)
    if (currency > 1000000000) return;

    //Set currency
    member.data.currency = currency;
};