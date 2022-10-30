const User = require('../models/User');
const { hash, compare } = require('bcrypt');


async function register(username, password, email) {
    const existing = await getUserByEmail(username);

    if(existing) {
        throw new Error('Incorrect username or password');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        hashedPassword,
        email
    });
    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if(!user) {
        throw new Error('User dosent exist');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if(!hasMatch) {
        throw new Error('Incorrect email or password');
    }

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user;
}

module.exports = {
    login,
    register
}