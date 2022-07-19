const Joi = require('joi');
const { User } = require('../database/models');
const createToken = require('../middlewares.js/token');

const validateBody = (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) {
        error.name = 'ValidationError';
        throw error;
    }
    return value;
};

const loginService = async (email, password) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
            .error(new Error('Some required fields are missing')),
        password: Joi.string().required()
            .error(new Error('Some required fields are missing')),
    });

    validateBody({ email, password }, schema);
    const user = await User.findOne({ where: { email } });
    
    if (!user || user.password !== password) {
        const e = new Error('Invalid fields');
        e.name = 'loginError';
        throw e;
    }
    const token = createToken(email);
    return { token };
};

module.exports = loginService;