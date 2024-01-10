const { Sequelize } = require('sequelize');
require('dotenv').config();

// .env ファイルから環境変数を読み込む
const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbHost = process.env.POSTGRES_HOST;

// データベース接続設定
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres'
});

module.exports = sequelize;
