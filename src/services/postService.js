const Joi = require('joi');
const { BlogPost, sequelize, Category } = require('../database/models');

const validateBody = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().min(1).required(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
        const e = new Error('Some required fields are missing');
        e.name = 'ValidationError';
        throw e;
    }
    return value;
};

const createPost = async ({ title, content, categoryIds, userId }) => {
    validateBody({ title, content, categoryIds });

    const t = await sequelize.transaction();
    try {
        const post = await BlogPost.create(
        { title, content, userId },
        { transaction: t },
        );
        await Promise.all(categoryIds.map((category) => Category.create(
            {
                postId: post.id,
                categoryId: category,
            },
            { transaction: t },
        )));
    } catch (error) {
        await t.rollback();
        return error;
    }  
};

module.exports = createPost;