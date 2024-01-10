const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model');

router.get('/getQuest', async (req, res) => {
    try {
        const quests = await Quests.findAll();
        res.json(quests);
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
