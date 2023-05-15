const { io } = require("socket.io-client");

const config = require("../config.json");

const socket = io(config.base_url, {
    path: `/${process.argv[2]}/core`
});

module.exports = socket;

// 649132e7-03dc-4c90-9747-a137225450a1
// de62799c-048c-4472-ab8a-c92027801420
// 0a517974-d77a-4f57-acbc-d81ef411b487
// 9c11a6a1-b3db-4c03-8327-348dafbd608e
// 085709fd-2f11-431d-93f4-ff9c80f8ac03

// node index.js 649132e7-03dc-4c90-9747-a137225450a1
// node index.js de62799c-048c-4472-ab8a-c92027801420
// node index.js 0a517974-d77a-4f57-acbc-d81ef411b487
// node index.js 9c11a6a1-b3db-4c03-8327-348dafbd608e