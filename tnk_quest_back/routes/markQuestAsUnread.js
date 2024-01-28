const express = require('express');
const router = express.Router();
const UserQuest = require('../models/read.model');
const Hunters = require('../models/hunter.model');

// ユーザークエストのisReadをfalseに変更するエンドポイント
router.post('/markQuestAsUnread', async (req, res) => {
    const { hunterName, questId } = req.body; // ハンター名とクエストIDを受け取る
    try {
        // ハンター名からハンターのIDを取得
        const hunter = await Hunters.findOne({
            where: {
                user_name: hunterName,
            },
        });

        if (!hunter) {
            return res.status(404).json({ error: 'Hunter not found' });
        }
        // ハンターIDとクエストIDを使用してユーザークエストを検索
        let userQuest = await UserQuest.findOne({
            where: {
                userId: hunter.id, // ハンターのIDを使用
                questId,
            },
        });
        
        // ユーザークエストが存在する場合のみisReadをfalseに変更
        if (userQuest) {
            userQuest.isRead = false;
            await userQuest.save();
        }
        res.status(200).json({ message: 'Quest marked as unread successfully' });
    } catch (e) {
        console.error(e); // エラーメッセージをコンソールに出力
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
