const { Router } = require('express');
const categoryController = require('../../controllers/categoryController');
const { validateToken } = require('../../middlewares.js/token');

const categoryRoute = Router();

categoryRoute.post('/', validateToken, categoryController.createCategory);

categoryRoute.get('/', validateToken, categoryController.listCategories);

categoryRoute.get('/:id', validateToken, categoryController.findCategoryById);

module.exports = categoryRoute;