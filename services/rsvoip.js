const { io } = require("socket.io-client");

const config = require("../config.json");

const socket = io(config.base_url, {
    path: `/${config.device_token}/core`
});

module.exports = socket;