// jshint esversion:6

const { MongooseClient } = require("mongoose");

const init = (connectionString) => {
    return MongooseClient.connect(connectionString, { useUnifiedTopology: true });
};

module.exports = { init };