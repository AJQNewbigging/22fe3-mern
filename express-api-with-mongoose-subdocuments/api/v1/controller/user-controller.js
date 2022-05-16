const UserNotFoundError = require('../errors/user-not-found-error.js');
const User = require('../model/user.js');

// when we create an instance of a mongoose model, we must pass an object matching the structure of the model
// to the constructor
const users = [new User({ username: "fred123" }), new User({ username: "bob123" })];

module.exports = {

    readAll: async (req, res, next) => {
        const users = await User.find({});
        
        res.status(200).json(users);
    },
    
    readById: async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
            return; // stops the function from trying to execute the next res.status(404)
        }
        // pass the error to next() to call the next error handler
        // - in Express 5, we can just throw the error (Express5 is still in beta, we are using Express4 here)
        next(new UserNotFoundError(id));
    },

    create: async (req, res, next) => {
        const user = new User(req.body);

        try {
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        const user = await User.updateOne({ _id: id }, updates);

        if (user) {
            res.status(200).json(user);
            return;
        }
        next(new UserNotFoundError(id));
    },

    delete: async (req, res, next) => {
        const filter = { _id: req.params.id };

        // alternate way
        const user = await User.findOneAndDelete(filter);
        if (user) {
            return res.status(200).json(user);
        }
        next(new UserNotFoundError(id));
    },

    addContact: async (req, res, next) => {
        const contact = req.body;
        const user = await User.findById(req.params.userid);

        if (user) {
            // to update the users contacts, we just push items into the array or remove them and then
            // save the user
            user.contact.push(contact);
            await user.save();

            res.status(200).json(user);
            return; // stops the function from trying to execute the next res.status(404)
        }
        next(new UserNotFoundError(id));
    }
}

