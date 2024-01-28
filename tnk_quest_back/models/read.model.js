const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hunters = require('./hunter.model');
const Quests = require('./quest.model');

class UserQuest extends Model {}

UserQuest.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hunters,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    questId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Quests,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, { 
    sequelize, 
    modelName: 'userQuest' 
});

module.exports = UserQuest;
