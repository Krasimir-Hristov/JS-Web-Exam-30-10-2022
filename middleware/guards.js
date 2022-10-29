function isUser() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}
//TODO Care for the fields names !!!!
function isOwner() {
    return function (req, res, next) {
        const userId = req.session.user?._id;
        if (res.locals.post.owner == userId) {
            next();
        } else {
          
            res.redirect('/login');
        }
    };
}

module.exports = {
    isUser,
    isGuest,
    isOwner
};