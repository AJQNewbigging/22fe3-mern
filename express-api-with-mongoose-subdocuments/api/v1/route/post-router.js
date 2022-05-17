const express = require('express');

const postController = require('../controller/post-controller');
const router = express.Router();

// passing references to functions to handle the requests
// to the specified route
router.get('/', postController.readAll);
router.get('/:id', postController.readById);
router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);
router.post('/:postId/comment', postController.addComment);

module.exports = router;