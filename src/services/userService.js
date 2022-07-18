const Joi = require('joi');
const { User } = require('../database/models');
const createToken = require('../helpers/token');

const validateBody = (data) => {
    const schema = Joi.object({
    email: Joi.string().email().required().empty(),
    password: Joi.string().required().empty(),
    });
    
    const { error, value } = schema.validate(data);
    if (error) {
        const e = new Error('Some required fields are missing');
            e.name = 'ValidationError';
            throw e;
    }
    return value;
};

const loginService = async (email, password) => {
        validateBody({ email, password });
        const user = await User.findOne({ where: { email } });
    
        if (!user || user.password !== password) {
            const e = new Error('Invalid fields');
            e.name = 'loginError';
            throw e;
        }
        const token = createToken(email);
        return { token };
};

module.exports = { loginService };