const { Router } = require('express');
const userController = require('../../controllers/userController');
const { validateToken } = require('../../middlewares.js/token');

const userRoute = Router();

userRoute.post('/', userController.createUser);

userRoute.get('/', validateToken, userController.listUsers);

userRoute.get('/:id', validateToken, userController.findUserById);

module.exports = userRoute;