const express = require('express');
const router = express.Router();
const UserQuest = require('../models/read.model');

// 特定のクエストIDに関連するすべてのユーザークエストのisReadをfalseに変更するエンドポイント
router.post('/markQuestAsUnread', async (req, res) => {
    const { questId } = req.body; // クエストIDを受け取る

    // クエストIDのバリデーション
    if (!questId) {
        return res.status(400).json({ error: 'Quest ID is required' });
    }

    try {
        // クエストIDに一致するすべてのユーザークエストのisReadをfalseに更新
        await UserQuest.update({ isRead: false }, { where: { questId } });

        res.status(200).json({ message: 'All quests marked as unread successfully' });
    } catch (e) {
        console.error(e); // エラーメッセージをコンソールに出力
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
