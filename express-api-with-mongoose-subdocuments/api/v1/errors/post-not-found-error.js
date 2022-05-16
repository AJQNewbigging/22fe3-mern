module.exports = class PostNotFoundError extends Error {

    constructor(id) {
        super(`Post not found with id ${id}`);
        this.id = id;
    }
}