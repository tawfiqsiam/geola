//Load env variables
require("dotenv").config({ path: `${__dirname}/.env` });

//Run main script
require("./main")();