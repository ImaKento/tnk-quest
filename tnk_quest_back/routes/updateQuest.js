const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model'); // モデルのパスは適宜調整してください

router.put('/updateQuest/:pk', async (req, res) => {
    const pk = req.params.pk;
    const updateData = req.body;

    try {
        const quest = await Quests.findByPk(pk);

        if (!quest) {
            return res.status(404).json({ error: 'クエストが見つかりません' });
        }

        // データの更新
        await quest.update(updateData);
        res.status(200).json(quest);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
