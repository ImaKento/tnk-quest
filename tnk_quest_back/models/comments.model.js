const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Quests = require('./quest.model');

class Comments extends Model {}

Comments.init({
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
    content: {
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
    modelName: 'comments'
});

// QuestsとCommentsの間の関連付け
Comments.belongsTo(Quests, { foreignKey: 'questId', as: 'quest' });
Quests.hasMany(Comments, { foreignKey: 'questId', as: 'comments' });

module.exports = Comments;