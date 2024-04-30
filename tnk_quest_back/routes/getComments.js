const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.model'); 

// 特定のスレッドIDに関連するコメントを取得
router.get('/getComments/:threadId', async (req, res) => {
    try {
        const { threadId } = req.params; // URLパラメータからthreadIdを取得

        // 指定されたスレッドIdに関連するコメントを全て取得
        const comments = await Comments.findAll({
            where: { threadId },
            order: [['date', 'ASC']] // コメントを日付順でソート
        });

        res.json(comments);

    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
