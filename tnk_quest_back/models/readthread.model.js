const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hunters = require('./hunter.model');
const Threads = require('./thread.model');
const Quests = require('./thread.model');

class UserThread extends Model {}

UserThread.init({
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hunters,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    questId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Threads,
            key:'id',
        },
        onDelete:'CASCADE'
    },
    threadId: {
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
    modelName: 'userThread' 
});

module.exports = UserThread;
