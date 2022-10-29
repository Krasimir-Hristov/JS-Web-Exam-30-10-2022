const authController = require('../controllers/auth');
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(postController);


    app.get('*', (req, res) => {
        res.render('404', { title: 'Page Not Found' });
    });
}