const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Hunters = require('./hunter.model');

class Achievement extends Model {}

Achievement.init({
    quest_title: {
        type: DataTypes.STRING
    },
    quest_rank: {
        type: DataTypes.STRING
    }
}, { 
    sequelize, 
    modelName: 'achievement' 
});

Achievement.belongsTo(Hunters, { foreignKey: 'hunterId', as: 'hunter', onDelete: 'CASCADE' });
Hunters.hasMany(Achievement, { foreignKey: 'hunterId', as: 'achievements', onDelete: 'CASCADE' });

module.exports = Achievement;
