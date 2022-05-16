module.exports = class HttpError extends Error {

    constructor(error, statusCode) {
        super(error.message);
        this.data = { error }; // destructures all properties (including functions) in error to be fields of data
        this.statusCode = statusCode;
    }
}