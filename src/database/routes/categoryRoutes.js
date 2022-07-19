const { Router } = require('express');
const categoryController = require('../../controllers/categoryController');
const { validateToken } = require('../../middlewares.js/token');

const categoryRoute = Router();

categoryRoute.post('/', validateToken, categoryController);

module.exports = categoryRoute;