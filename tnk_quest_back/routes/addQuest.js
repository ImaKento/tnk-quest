const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model');

router.post('/addQuest', async (req, res) => {
    try {
        let { deadline, capacity, ...data } = req.body;

        // 'deadline' を正しい日時形式に変換
        if (deadline) {
            deadline = new Date(deadline);
        }

        // 'capacity' を整数に変換
        if (capacity) {
            capacity = parseInt(capacity);
        }

        const newQuest = await Quests.create({ ...data, deadline, capacity });
        res.status(200).json(newQuest);
    } catch (e) {
        res.status(400).json({ error: e.toString() });
    }
});

module.exports = router;
