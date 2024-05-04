const express = require('express');
const router = express.Router();
const UserThread = require('../models/readthread.model');
const Quests = require('../models/quest.model');
const Hunters = require('../models/hunter.model');
const Threads = require('../models/thread.model');

// ハンターの名前を受け取り、未読/既読情報を取得するエンドポイント。 クエストIDから情報を取得できる変数を作成。
router.get('/getReadThreadStatusAsQuest/:hunterName', async (req, res) => {
    const { hunterName } = req.params; // パラメータからハンター名を受け取る

    try {
        // すべてのクエスト情報を取得
        const allQuests = await Quests.findAll();

        // 未読/既読情報を作成
        const readStatus = {};

        for (const quest of allQuests) {
            const questId = quest.id;
            //指定されたクエストのスレッド情報を取得
            const threads = await Threads.findAll({
                where: {
                    questId:questId,
                },
            });
            //デフォルトは既読に設定
            readStatus[questId] = true;

            for(const thread of threads){

                // ハンター名からハンターを検索
                const hunter = await Hunters.findOne({
                    where: {
                        user_name: hunterName,
                    },
                });

                if (!hunter) {
                    return res.status(404).json({ error: 'Hunter not found' });
                }
                
                // ハンターIDとクエストID、スレッドIDを使用してユーザースレッドを検索
                const userThread = await UserThread.findOne({
                    where: {
                        userId: hunter.id,
                        questId : questId,
                        threadId: thread.id,
                    },
                });
                //クエストに含まれるスレッドのうち、１つでも未読スレッドがあれば、未読に設定
                if (!userThread){
                    readStatus[questId] = false;
                }else{
                    if(userThread.isRead === false ){
                        readStatus[questId] = false;
                    }
                }    
            }
        }
        res.status(200).json(readStatus);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
