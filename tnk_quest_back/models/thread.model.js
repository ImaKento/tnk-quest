const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Quests = require('./quest.model');

class Threads extends Model {}

Threads.init({
    hunterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    questId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'quests', // 'Quests'は関連付けられたモデルの名前に合わせてください
            key: 'id', // 'id'はQuestsモデルの主キーに合わせてください
        },
        allowNull: false
    },    
    title: {
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 
}, {
    sequelize,
    modelName: 'threads'
});

// QuestsとThreadsの間の関連付け
Threads.belongsTo(Quests, { foreignKey: 'questId', as: 'quest' });
Quests.hasMany(Threads, { foreignKey: 'questId', as: 'threads' });

module.exports = Threads;