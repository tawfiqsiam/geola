module.exports = async input => {

    const fetch = require("node-fetch");
    const fileType = require("file-type");

    return new Promise(resolve => {
        fetch(input)
            .then(async result => {
                result = await result.buffer();
                result = fileType(result);
                resolve(Boolean(result));
            })
            .catch(() => resolve(false));
    });
};