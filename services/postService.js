const Post = require('../models/Post');


//TODO care for the populate fields must be in the SCHEMA !!!!
async function getPostsAndUsers(id) {
    return Post.findById(id).populate('owner').populate('followers').lean();
}

async function getPostById(id) {
    return Post.findById(id).lean();
}

async function createPost(post) {
    const result= new Post(post);
    await result.save();
}

async function getRecent() {
    return Post.find({}).sort().limit(3).lean();
}

async function getAllPosts() {
    return Post.find({}).lean();
}

async function updatePost(id, post) {
    const existing = await Post.findById(id);

     existing.title = post.title;
     existing.postImg = post.postImg;
     existing.content = post.content;
     existing.category = post.category;

     await existing.save();
}

async function deletePost(id) {
    await Post.findByIdAndDelete(id);
}

async function followPost(postId, userId) {
    const post = await Post.findById(postId);

    if(post.followers.includes(userId)) {
        throw new Error('You already follow this post');
    }

    post.followers.push(userId);
    await post.save();
}

async function getPostsByUser(userId) {
    return Post.find({ owner: userId }).lean();
}

async function getFollowsByUser(userId) {
    return Post.find({ followers: userId }).lean();
}





module.exports = {
    getPostsAndUsers,
    getPostById,
    createPost,
    getRecent,
    getAllPosts,
    updatePost,
    deletePost,
    followPost,
    getPostsByUser,
    getFollowsByUser
}