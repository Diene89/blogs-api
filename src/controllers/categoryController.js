const categoryService = require('../services/categoryService');
// require('express-async-errors');

const createCategory = async (req, res) => {
    const { name } = req.body;

    const result = await categoryService.createCategory(name);
    return res.status(201).json(result);
};

const listCategories = async (req, res) => {
    const result = await categoryService.listCategories();

    return res.status(200).json(result);
};

module.exports = { 
    createCategory, listCategories,
};