//jshint esversion:6

const attachTo = (app) => {
    app.get('/', (req, res) => {
        return res.render('home');
    });
};

module.exports = { attachTo };


