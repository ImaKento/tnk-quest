const express = require('express');
const router = express.Router();
const Threads = require('../models/thread.model');

router.post('/addThread', async (req, res) => {
    try {
        const { questId, hunterName, title} = req.body;

        if (!questId || !hunterName || !title) {
            return res.status(400).json({error: "Quest ID, hunter name, and title are required." });
        }

        // 新しいスレッドオブジェクトを作成
        const NewThread = await Threads.create({ questId, hunterName, title });
        // 作成したスレッドをレスポンスとして返す
        res.status(200).json(NewThread);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
});

module.exports = router;
