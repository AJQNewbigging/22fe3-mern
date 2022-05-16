module.exports = class UserNotFoundError extends Error {

    constructor(id) {
        super(`User not found with id ${id}`);
        this.id = id;
    }
}