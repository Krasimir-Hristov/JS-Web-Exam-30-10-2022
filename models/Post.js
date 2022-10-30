const { Schema, model, Types: { ObjectId } } = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;


const postSchema = new Schema({
    title: { type: String, required: true,
         minlength: [5, 'Title must be at least 5 characters and no longer than 50 characters'],
         maxlength: [50, 'Title must be at least 5 characters and no longer than 50 characters']},
    postImg: { type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Invalid URL'
    } },
    content: { type: String, required: true, minlength: [10, 'Content must be at least 10 characters long'] },
    category: { type: String, required: true, minlength: [3, 'Category must be at least 3 characters long'] },
    followers: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', required: true },
});


const Post = model('Post', postSchema);

module.exports = Post; 