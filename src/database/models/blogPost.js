const sequelize = require('sequelize');
const createBlogPost = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        },
        published: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updated: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    },
    {
        tableName: 'BlogPosts',
        timestamps: false,
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User,
            { foreignKey: 'userId', as: 'User' });
    }

    return BlogPost;
}

module.exports = createBlogPost;