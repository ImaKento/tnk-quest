const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model');
const Hunters = require('../models/hunter.model');
const Achievement = require('../models/achievement.model');

router.post('/completeQuest', async (req, res) => {
    const { quest_id } = req.body;

    try {
        // クエストの取得
        const quest = await Quests.findByPk(quest_id);

        if (!quest) {
            return res.status(404).json({ error: 'クエストが見つかりません。' });
        }

        // クエストのcompletedをTrueに設定
        quest.completed = true;
        await quest.save();

        // quest.huntersに格納されているハンター名のリストを取得
        const hunterNames = quest.hunters ? quest.hunters.split(' ') : [];

        // 空文字列をフィルタリング
        const validHunterNames = hunterNames.filter(name => name.trim() !== '');

        // 各ハンターに対してAchievementを作成
        for (const hunterName of validHunterNames) {
            const hunter = await Hunters.findOne({ where: { user_name: hunterName } });

            if (!hunter) {
                // ハンターが見つからない場合のエラーハンドリングを改善するか、
                // この場合にループを中断せずに次のイテレーションに進むように変更することも検討してください。
                continue; // ハンターが見つからない場合にはスキップする
            }

            await Achievement.create({
                hunterId: hunter.id,
                quest_title: quest.title,
                quest_rank: quest.rank
            });
        }

        return res.json({ message: 'クエストが全ハンターに対して完了として記録されました。' });

    } catch (e) {
        return res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
