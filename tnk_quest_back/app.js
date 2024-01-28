const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// CORS設定：http://192.168.11.52からのリクエストを許可
app.use(cors());

app.use(bodyParser.json());

// publicディレクトリを静的ファイルの提供用に設定
app.use(express.static('./public'));

// 各ルートハンドラのインポート
const signupHandler = require('./routes/signup');
const loginHandler = require('./routes/login');
const getQuestHandler = require('./routes/getQuest');
const addQuestHandler = require('./routes/addQuest');
const deleteQuestHandler = require('./routes/deleteQuest');
const deleteHunterHandler = require('./routes/deleteHunter');
const acceptQuestHandler = require('./routes/acceptQuest');
const updateQuestHandler = require('./routes/updateQuest');
const completeQuestHandler = require('./routes/completeQuest');
const getAchievementsHandler = require('./routes/getAchievements');
const getHuntersHandler = require('./routes/getHunters');
const getAllRanksCountHandler = require('./routes/getAllRankCount');

// ルート定義
app.post('/signup/', signupHandler);
app.post('/login/', loginHandler);
app.get('/getQuest/', getQuestHandler);
app.post('/addQuest/', addQuestHandler);
app.delete('/deleteQuest/:questId/', deleteQuestHandler);
app.delete('/deleteHunter/:userName/', deleteHunterHandler);
app.post('/acceptQuest/', acceptQuestHandler);
app.put('/updateQuest/:pk/', updateQuestHandler);
app.post('/completeQuest/', completeQuestHandler);
app.get('/getAchievements/:hunterName/', getAchievementsHandler);
app.get('/getHunters/', getHuntersHandler);
app.get('/getAllRanksCount/', getAllRanksCountHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
