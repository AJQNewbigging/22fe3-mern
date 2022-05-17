const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;