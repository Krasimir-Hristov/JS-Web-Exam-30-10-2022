const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getRecent, getAllPosts, getPostsByUser, getFollowsByUser } = require('../services/postService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const posts = await getRecent()

    res.render('home', {
        title: 'Home Page',
        posts
    });
});

router.get('/catalog', async (req, res) => {
    const posts = await getAllPosts();
    res.render('catalog', { title: 'All posts',  posts });
});

router.get('/catalog/:id', preload(true), (req, res) => {
    const post = res.locals.post
     post.followersList = post.followers.map(f => f.email).join(', ');
    if (req.session.user) {
        post.hasUser = true;
        post.isOwner = req.session.user._id == post.owner._id;

        if(post.followers.some(f => f._id == req.session.user._id)) {
            post.isFollowed = true;
        }
    }
   

    res.render('details', { title: 'Details Page' });
});

router.get('/profile', isUser(), async (req, res) => {
    const postByUser = await getPostsByUser(res.locals.user._id);
    const followsByUser = await getFollowsByUser(res.locals.user._id);
    res.locals.user.followedCount = followsByUser.length;
    res.locals.user.postsCount = postByUser.length;
    res.locals.user.posts = postByUser;
    res.locals.user.follows = followsByUser;
    res.render('profile', { title: 'Profile Page' });
});



module.exports = router;