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
    console.log('passou');
    const category = await Category.create({ name });
    return category;
};

module.exports = {
    createCategory,
};
