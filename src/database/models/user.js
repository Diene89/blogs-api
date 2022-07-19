const sequelize = require('sequelize');

const createUser = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          displayName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          }
    },
    {
      timestamps: false,
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost,
          { key: 'userId', as: 'BlogPost' });
  }
    return User;
};

module.exports = createUser;
