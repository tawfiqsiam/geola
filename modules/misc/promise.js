module.exports = async (promise, nullError) => {

    return new Promise(resolve => {

        promise
            .then(data => resolve(data))
            .catch(err => resolve(nullError ? null : err));
    });
};