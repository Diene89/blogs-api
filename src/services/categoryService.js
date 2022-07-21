const Joi = require('joi');
const { Category } = require('../database/models');

const validateBody = (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) throw error;
    return value;
};

const createCategory = async (name) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    // const result = await schema.validateAsync(name);
   validateBody({ name }, schema);
    const category = await Category.create({ name });
    return category;
};

const listCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

const findCategoryById = async (id) => {
    const category = await Category.findByPk(id);
    if (!category) {
        const e = new Error('"categoryIds" not found');
        e.name = 'ValidationError';
        throw e;
    }
    return category;
};

module.exports = {
    createCategory, listCategories, findCategoryById,
};
