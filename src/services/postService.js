const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { BlogPost, sequelize, Category, User, PostCategory } = require('../database/models');

const validateBody = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().integer()).required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
        const e = new Error('Some required fields are missing');
        e.name = 'ValidationError';
        throw e;
    }
    return value;
};

const insertPost = async (userId, title, content, categoryIds) => {
    const t = await sequelize.transaction();
    console.log('insert:', userId, title, content, categoryIds);

    try {
        const newPost = await BlogPost.create({ title, content, userId }, 
            { transaction: t }, { raw: true });
        await Promise.all(categoryIds.map((category) => PostCategory.create(
            { postId: newPost.id, categoryId: category }, { transaction: t },
        )));
        
        await t.commit();
        return newPost;
    } catch (error) {
        await t.rollback();
        return error;
    }
};

const createPost = async (title, content, categoryIds, request) => {
    validateBody({ title, content, categoryIds });
    const { data } = jwt.verify(request.headers.authorization, process.env.JWT_SECRET);
    const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
    if (!count) {
        const e = new Error('"categoryIds" not found');
        e.name = 'ValidationError';
        throw e;
    }
    const user = await User.findOne({ where: { email: data } });
    const userId = user.dataValues.id;
    return insertPost(userId, title, content, categoryIds);
};

module.exports = createPost;
