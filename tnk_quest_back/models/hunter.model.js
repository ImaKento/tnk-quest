const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Hunters extends Model {}

Hunters.init({
    user_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    sequelize, 
    modelName: 'hunters' 
});

module.exports = Hunters;
