const { Router } = require('express');
const userController = require('../../controllers/userController');

const loginRoute = Router();

loginRoute.post('/', userController);

module.exports = loginRoute;
