const express = require('express');
const router = express.Router();
const UserThread = require('../models/readthread.model');
const Threads = require('../models/thread.model');
const Hunters = require('../models/hunter.model');

// ハンターの名前を受け取り、未読/既読情報を取得するエンドポイント。 スレッドIDから情報を取得できる変数を作成。
router.get('/getReadThreadStatus/:hunterName', async (req, res) => {
    const { hunterName } = req.params; // パラメータからハンター名を受け取る

    try {
        // すべてのスレッド情報を取得
        const allThreads = await Threads.findAll();

        // 未読/既読情報を作成
        const readStatus = {};
        for (const thread of allThreads) {
            const threadId = thread.id;

            // ハンター名からハンターを検索
            const hunter = await Hunters.findOne({
                where: {
                    user_name: hunterName,
                },
            });

            if (!hunter) {
                return res.status(404).json({ error: 'Hunter not found' });
            }

            // ハンターIDとスレッドIDを使用してユーザースレッドを検索
            const userThread = await UserThread.findOne({
                where: {
                    userId: hunter.id,
                    threadId,
                },
            });

            readStatus[threadId] = userThread ? userThread.isRead : false;
        }

        res.status(200).json(readStatus);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    } 
});

module.exports = router;
