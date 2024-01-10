const express = require('express');
const router = express.Router();
const Hunters = require('../models/hunter.model');
const Achievement = require('../models/achievement.model');
const Sequelize = require('sequelize');

router.get('/getAllRanksCount', async (req, res) => {
    try {
        // 全ハンターの実績ランクを集計
        const rankCount = await Achievement.findAll({
            attributes: [
                'quest_rank',
                [Sequelize.fn('COUNT', Sequelize.col('quest_rank')), 'count']
            ],
            include: [{
                model: Hunters,
                as: 'hunter',
                attributes: ['user_name']
            }],
            group: ['quest_rank', 'hunter.user_name', 'hunter.id']
        });

        // 辞書型でランクを返す
        const rankDict = rankCount.reduce((acc, curr) => {
            const hunterName = curr.hunter.user_name;
            const rank = curr.quest_rank;
            if (!acc[hunterName]) {
                acc[hunterName] = {};
            }
            acc[hunterName][rank] = curr.dataValues.count;
            return acc;
        }, {});

        return res.json(rankDict);

    } catch (e) {
        return res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
