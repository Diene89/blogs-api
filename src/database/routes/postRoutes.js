const { Router } = require('express');
const postController = require('../../controllers/postController');
const { validateToken } = require('../../middlewares.js/token');

const blogPosts = Router();

blogPosts.post('/', validateToken, postController);

module.exports = blogPosts;