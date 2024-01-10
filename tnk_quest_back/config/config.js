require('dotenv').config();
module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
  },
  test: {
    // テスト環境用の設定
  },
  production: {
    // 本番環境用の設定
  }
};
