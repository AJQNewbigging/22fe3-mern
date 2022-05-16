const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 64,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // is the name of the collection which the id references
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;



















