//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path=require("path");

const init = () => {
    const app = express();

    // config start
    app.set('view engine', 'ejs');
    app.use(express.static("public"));
    app.use('/static', express.static(path.join(__dirname, 'public')));  //https://expressjs.com/en/starter/static-files.html
    //app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //config end

    require('./routers')
        .attachTo(app);

    return Promise.resolve(app);
};

module.exports = { init };