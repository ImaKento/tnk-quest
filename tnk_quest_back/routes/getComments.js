const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.model'); // モデルのパスを適切に設定してください

// 特定のクエストIDに関連するコメントを取得
router.get('/getComments/:questId/', async (req, res) => {
    try {
        const { questId } = req.params; // URLパラメータからquestIdを取得

        // 指定されたquestIdに関連するコメントを全て取得
        const comments = await Comments.findAll({
            where: { questId },
            order: [['date', 'ASC']] // コメントを日付順でソート
        });

        res.json(comments);
    } catch (e) {
        console.error(e); // エラーログを出力
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
