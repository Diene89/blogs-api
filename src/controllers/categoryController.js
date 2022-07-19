const categoryService = require('../services/categoryService');
// require('express-async-errors');

const createCategory = async (req, res) => {
    const { name } = req.body;

    const result = await categoryService.createCategory(name);
    return res.status(201).json(result);
};

module.exports = createCategory;