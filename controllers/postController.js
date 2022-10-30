const { isUser, isOwner } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { createPost, updatePost, deletePost, followPost } = require('../services/postService');
const mapErrors = require('../util/mappers');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Post', data: {} })
});

router.post('/create', isUser(), async (req, res) => {
    const post = {
    title: req.body.title,
    postImg: req.body.postImg,
    content: req.body.content,
    category: req.body.category,
    owner: req.session.user._id
};


    try {
        await createPost(post);

        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Post',  data: post, errors });
    }

});

router.get('/edit/:id', preload(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const post = {

        title: req.body.title,
        postImg: req.body.postImg,
        content: req.body.content,
        category: req.body.category,
    }
     

    try {
        await updatePost(id, post);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        post._id = id;
        res.render('edit', {title: 'Edit Post',  post, errors });
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deletePost(req.params.id);
    res.redirect('/catalog');     
});

router.get('/follow/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await followPost(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog');     
    }
});





module.exports = router;
