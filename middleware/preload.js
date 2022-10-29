const postService = require('../services/postService');


function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;

        if (populate) {
            res.locals.post = await postService.getPostsAndUsers(id);
        } else {
            res.locals.post = await postService.getPostById(id);
        }

        next();
    };
}

module.exports = preload;
