module.exports = async input => {

    const fs = require("fs");

    return new Promise(resolve => fs.readFile(input, (err, result) => resolve(result)));
};