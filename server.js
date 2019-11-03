//jshint esversion:6

const async = () => {
    return Promise.resolve();
};

const config = require('./config');

async()
    .then(() => require('./app').init())
    .then((app) => {
        app.listen(config.port, () => console.log(`Server started perfectly on ${config.port}...`));
    });



