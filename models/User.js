const { Schema, model } = require('mongoose');

//TODO change user model according to exam description
//TODO add validations
const userSchema = new Schema({
    username: { type: String, require: true },
    hashedPassword: { type: String, require: true }
});


userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;