const express = require('express');

const userController = require('../controller/user-controller');
const router = express.Router();

// passing references to functions to handle the requests
// to the specified route
router.get('/', userController.readAll);
router.get('/:id', userController.readById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.put('/contact/:userid', userController.addContact);

module.exports = router;