const express = require('express');
const router = express.Router();
const UserQuest = require('../models/read.model');
const Quests = require('../models/quest.model');
const Hunters = require('../models/hunter.model');

// ハンターの名前を受け取り、未読/既読情報を取得するエンドポイント
router.get('/getReadStatus/:hunterName', async (req, res) => {
    const { hunterName } = req.params; // パラメータからハンター名を受け取る

    try {
        // すべてのクエスト情報を取得
        const allQuests = await Quests.findAll();

        // 未読/既読情報を作成
        const readStatus = {};
        for (const quest of allQuests) {
            const questId = quest.id;

            // ハンター名からハンターを検索
            const hunter = await Hunters.findOne({
                where: {
                    user_name: hunterName,
                },
            });

            if (!hunter) {
                return res.status(404).json({ error: 'Hunter not found' });
            }

            // ハンターIDとクエストIDを使用してユーザークエストを検索
            const userQuest = await UserQuest.findOne({
                where: {
                    userId: hunter.id,
                    questId,
                },
            });

            readStatus[questId] = userQuest ? userQuest.isRead : false;
        }

        res.status(200).json(readStatus);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
