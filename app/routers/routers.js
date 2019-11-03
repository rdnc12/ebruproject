//jshint esversion:6

const attachTo = (app) => {
    app.get('/', (req, res) => {
        return res.render('home');
    });
    app.get('/contact', (req, res) => {
        return res.render('contact/contact');
    });
};

module.exports = { attachTo };


