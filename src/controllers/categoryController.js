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

const findCategoryById = async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.findCategoryById(id);

    return res.status(200).json(result);
};

module.exports = { 
    createCategory, listCategories, findCategoryById,
};