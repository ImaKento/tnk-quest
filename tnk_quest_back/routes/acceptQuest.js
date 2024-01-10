const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model');

router.post('/acceptQuest', async (req, res) => {
    const { quest_id, hunter_name } = req.body;

    try {
        const quest = await Quests.findByPk(quest_id);

        if (!quest) {
            return res.status(404).json({ error: 'Quest not found' });
        }

        const existingHunters = quest.hunters ? quest.hunters.split(' ') : [];

        // 名前の重複をチェック
        if (existingHunters.includes(hunter_name)) {
            return res.status(400).json({ error: 'This hunter has already accepted the quest' });
        }

        // 名前を追加
        quest.hunters = existingHunters.length > 0 ? `${quest.hunters} ${hunter_name}` : hunter_name;
        await quest.save();

        res.status(200).json({ message: 'Quest accepted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
