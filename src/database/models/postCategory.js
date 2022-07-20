const sequelize = require('sequelize');

const createPostCategoy = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    });

    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost,
            {
                foreignKey: 'categoryId',
                as: 'category',
                otherKey: 'postId',
                through: PostCategory,
            });
        models.BlogPost.belongsToMany(models.Category,
            {
                foreignKey: 'postId',
                as: 'blogPost',
                otherKey: 'categoryId',
                through: PostCategory,
            });
        
    }
    
      return PostCategory;

};

module.exports = createPostCategoy;