const Joi = require('joi');
const { User } = require('../database/models');
const { createToken } = require('../middlewares.js/token');

const validateBody = (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) throw error;
    
    return value;
};

const userService = async (displayName, email, password, image) => {
    const schema = Joi.object({
        displayName: Joi.string().required().min(8),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6),
        image: Joi.string().required(),
    });
    validateBody({ displayName, email, password, image }, schema);
    const user = await User.findOne({ where: { email } });

    if (user) {
        const e = new Error('User already registered');
        e.name = 'userError';
        throw e;
    }
    await User.create({ displayName, email, password, image });
    const token = createToken(email);
    return { token }; 
};

module.exports = userService;