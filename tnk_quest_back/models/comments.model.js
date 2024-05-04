const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Threads = require('./thread.model');

class Comments extends Model {}

Comments.init({
    hunterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    threadId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'threads', // 'Threads'は関連付けられたモデルの名前に合わせてください
            key: 'id', // 'id'はThreadsモデルの主キーに合わせてください
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

// ThreadsとCommentsの間の関連付け
Comments.belongsTo(Threads, { foreignKey: 'threadId', as: 'thread' });
Threads.hasMany(Comments, { foreignKey: 'threadId', as: 'comments' });

module.exports = Comments;