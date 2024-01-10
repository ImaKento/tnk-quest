const express = require('express');
const router = express.Router();
const Hunters = require('../models/hunter.model');
const Achievement = require('../models/achievement.model');

router.get('/getAchievements/:hunterName', async (req, res) => {
    const hunterName = req.params.hunterName;

    try {
        let achievements;

        if (hunterName === 'ALL') {
            achievements = await Achievement.findAll({
                include: [{ model: Hunters, as: 'hunter', attributes: ['user_name'] }]
            });
        } else {
            const hunter = await Hunters.findOne({ where: { user_name: hunterName } });

            if (!hunter) {
                return res.status(404).json({ error: 'ハンターが見つかりません。' });
            }

            achievements = await Achievement.findAll({ where: { hunterId: hunter.id } });
        }

        const data = achievements.map((achievement) => ({
            quest_title: achievement.quest_title,
            quest_rank: achievement.quest_rank,
            hunter_name: hunterName === 'ALL' ? achievement.hunter.user_name : undefined
        }));

        return res.json(data);

    } catch (e) {
        return res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
