const express = require('express');
const router = express.Router();
const UserThread = require('../models/readthread.model');

// 特定のスレッドIDに関連するすべてのユーザースレッドのisReadをfalseに変更するエンドポイント
router.post('/markThreadAsUnread', async (req, res) => {
    const { threadId } = req.body; // スレッドIDを受け取る

    // スレッドIDのバリデーション
    if (!threadId) {
        return res.status(400).json({ error: 'Thread ID is required' });
    }

    try {
        // スレッドIDに一致するすべてのユーザースレッドのisReadをfalseに更新
        await UserThread.update({ isRead: false }, { where: { threadId } });

        res.status(200).json({ message: 'All threads marked as unread successfully' });
    } catch (e) {
        console.error(e); // エラーメッセージをコンソールに出力
        res.status(500).json({ error: e.toString() }); 
    }
});

module.exports = router;
