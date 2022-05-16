const User = require('../model/user.js');
const Post = require('../model/post');
const PostNotFoundError = require('../errors/post-not-found-error');

module.exports = {

    readAll: async (req, res, next) => {
        const posts = await Post.find({})
                                .populate('user'); // populates the user field with data from the db
        
        res.status(200).json(posts);
    },
    
    readById: async (req, res, next) => {
        const id = req.params.id;
        const post = await Post.findById(id).populate('user');
        if (post) {
            res.status(200).json(post);
            return; // stops the function from trying to execute the next res.status(404)
        }
        // pass the error to next() to call the next error handler
        // - in Express 5, we can just throw the error (Express5 is still in beta, we are using Express4 here)
        next(new PostNotFoundError(id));
    },

    create: async (req, res, next) => {
        const post = new Post(req.body);

        try {
            await post.save();
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;

        const post = await User.updateOne({ _id: id }, updates);

        if (post) {
            res.status(200).json(post);
            return;
        }
        next(new PostNotFoundError(id));
    },

    delete: async (req, res, next) => {
        const filter = { _id: req.params.id };

        const post = await Post.findOneAndDelete(filter);
        if (post) {
            return res.status(200).json(post);
        }
        next(new PostNotFoundError(id));
    }
}

