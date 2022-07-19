const Joi = require('joi');
const { User } = require('../database/models');
const { createToken } = require('../middlewares.js/token');

const validateBody = (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) throw error;
    
    return value;
};

const createUser = async (displayName, email, password, image) => {
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

const listUsers = async () => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password'],
        },
    });
    return users;
};

const findUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password'],
        }, 
    });
    if (!user) {
        const e = new Error('User does not exist');
        e.name = 'userNotExistError';
        throw e;
    }
    return user;
};

module.exports = {
    createUser, listUsers, findUserById,
};