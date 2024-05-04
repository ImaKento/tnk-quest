const express = require('express');
const router = express.Router();
const Threads = require('../models/thread.model'); // モデルのパスを適切に設定してください

// 特定のクエストIDに関連するスレッドを取得
router.get('/getThreads/:questId', async (req, res) => {
    const { questId } = req.params; // URLパラメータからquestIdを取得
    

    try {
        // 指定されたquestIdに関連するスレッドを全て取得
        const threads = await Threads.findAll({
            where: { questId },
            order: [['date', 'DESC']] // スレッドを日付順でソート
        });
        res.json(threads);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
