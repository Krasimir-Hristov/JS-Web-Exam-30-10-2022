const { Schema, model, Types: { ObjectId } } = require('mongoose');


const userSchema = new Schema({
    username: { type: String, require: true, minlength: [2, 'Username must be at least 2 characters long!'] },
    email: { type: String, require: true, minlength: [5, 'Email must be at least 5 characters long!'] },
    hashedPassword: { type: String, require: true }
});


userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;