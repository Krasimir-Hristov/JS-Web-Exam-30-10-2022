const Post = require('../models/Post');


//TODO care for the populate fields must be in the SCHEMA !!!!
async function getPostsAndUsers(id) {
    return Post.findById(id).populate('author').populate('usersShared').lean();
}

async function getPostById(id) {
    return Post.findById(id).lean();
}

// async function updatePublication(id, publication) {
//     const existing = await Publication.findById(id);

//      existing.title = publication.title;
//      existing.technique = publication.technique;
//      existing.picture = publication.picture;
//      existing.certificate = publication.certificate;

//      await existing.save();
// }

// async function deletePublication(id) {
//     await Publication.findByIdAndDelete(id);
// }

// async function sharePublication(publicationId, userId) {
//     const publication = await Publication.findById(publicationId);

//     if(publication.usersShared.includes(userId)) {
//         throw new Error('You already share this publication');
//     }

//     publication.usersShared.push(userId);
//     await publication.save();
// }

// async function getPublicationsByUser(userId) {
//     return Publication.find({ author: userId }).lean();
// }

// async function getSharesByUser(userId) {
//     return Publication.find({ usersShared: userId }).lean();
// }


module.exports = {
    getPostsAndUsers,
    getPostById
}