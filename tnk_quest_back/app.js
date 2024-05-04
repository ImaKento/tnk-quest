const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// CORS設定：http://192.168.11.52からのリクエストを許可
app.use(cors());

app.use(bodyParser.json());

app.use(morgan('dev'));

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
const markQuestAsReadHandler = require('./routes/markQuestAsRead');
const getReadStatusHandler = require('./routes/getReadStatus');
const markQuestAsUnreadHandler = require('./routes/markQuestAsUnread');
const addCommentsHandler = require('./routes/addComments');
const getCommentsHandler = require('./routes/getComments');
const addThreadHandler = require('./routes/addThread');
const getThreadsHandler = require('./routes/getThreads');
const markThreadAsReadHandler = require('./routes/markThreadAsRead');
const markThreadAsUnreadHandler = require('./routes/markThreadAsUnread');
const getReadThreadStatusHandler = require('./routes/getReadThreadStatus'); 
const getReadThreadStatusAsQuestHandler = require('./routes/getReadThreadStatusAsQuest'); 

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
app.post('/markQuestAsRead/', markQuestAsReadHandler);
app.get('/getReadStatus/:hunterName/', getReadStatusHandler);
app.post('/markQuestAsUnread/', markQuestAsUnreadHandler);
app.post('/addComments/', addCommentsHandler);
app.get('/getComments/:threadId/', getCommentsHandler);
app.post('/addThread/', addThreadHandler);
app.get('/getThreads/:questId/', getThreadsHandler);
app.post('/markThreadAsRead/',markThreadAsReadHandler);
app.post('/markThreadAsUnread/',markThreadAsUnreadHandler);
app.get('/getReadThreadStatus/:hunterName/',getReadThreadStatusHandler);
app.get('/getReadThreadStatusAsQuest/:hunterName/',getReadThreadStatusAsQuestHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
