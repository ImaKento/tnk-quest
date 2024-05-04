const express = require('express');
const router = express.Router();
const Quests = require('../models/quest.model');
const Threads = require('../models/thread.model');
const Comments = require('../models/comments.model');

router.delete('/deleteQuest/:questId', async (req, res) => {
    const questId = req.params.questId;

    try {
        const quest = await Quests.findByPk(questId);
        
        if (!quest) {
            return res.status(404).json({ error: 'Quest not found' });
        }
        
        //削除するスレッドを取得
        const threads = await Threads.findAll({ where : { questId : questId}});
        //削除するスレッドに関連付けれたコメントを削除
        for ( const thread of threads) {
            await Comments.destroy({where:{ threadId: thread.id}});
        }

        // スレッドを削除
        await Threads.destroy({ where: { questId: questId } });

        // クエストを削除
        await quest.destroy();
        res.status(200).json({ message: 'Quest deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});


module.exports = router;
