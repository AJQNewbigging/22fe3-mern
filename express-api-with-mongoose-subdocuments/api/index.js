const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose'); // the mongoose object represents our database connection
const HttpError = require('./v1/errors/http-error');
const UserNotFoundError = require('./v1/errors/user-not-found-error');
const userRouter = require('./v1/route/user-router');
const postRouter = require('./v1/route/post-router');

const DB_URI = process.env.DB_URI || "mongodb://127.0.0.1:27017/user-app"; // user-app db will be created if it doesn't exist when we connect
const PORT = process.env.PORT || 3000;
const app = express();

// Apply environment configurations and/or middleware
if (process.env.NODE_ENV === "PRODUCTION") {
    console.log("=== PRODUCTION ===");
    app.use(morgan('combined'));
} else {
    console.log("=== DEVELOPMENT ===");
    app.use(morgan('dev'));
}

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Router level middleware
app.use("/v1/user", userRouter);
app.use("/v1/post", postRouter);

// Error handling middleware
app.use((error, request, response, next) => {
    console.error(error.message);

    if (!(error instanceof HttpError)) {
        if (error instanceof UserNotFoundError) {
            error = new HttpError(error, 404);
        } else if (error.name === "ValidationError") {
            error = new HttpError(error, 400);
        } else {
            // unknown error
            error = new HttpError(new Error("Something went wrong..."), 500);
        }
    }
    // It must be a HTTP error to have reached here, whether that was passed to error, or created
    // above
    return response.status(error.statusCode).json({
        message: error.message,
        data: error.data 
    })
});

async function main() {
    // connect to the database
    await mongoose.connect(DB_URI, { useNewUrlParser: true })
                  .then(() => console.log(`DB Connected: ${DB_URI}`));

    // get the connection object
    const db = mongoose.connection;

    // bind error and connection events
    db.on('error', console.error.bind(console, 'MongoDB connection error'));
    db.on('connection', console.log.bind(console, 'MongoDB connected'));

    // Start the server
    const server = app.listen(PORT, function() {
        console.log(`Server up on ${PORT}`);
    });
}

main();
