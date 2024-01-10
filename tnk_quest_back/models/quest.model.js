const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Quests extends Model {}

Quests.init({
    client: {
        type: DataTypes.STRING,
        defaultValue: "unknown"
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        defaultValue: 10
    },
    rank: {
        type: DataTypes.STRING,
        defaultValue: "C"
    },
    overview: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hunters: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { 
    sequelize, 
    modelName: 'quests' 
});

module.exports = Quests;
