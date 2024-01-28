const express = require('express');
const router = express.Router();
const UserQuest = require('../models/read.model');
const Hunters = require('../models/hunter.model');

// ユーザーがクエストを読んだことを示すブール値を更新するエンドポイント
router.post('/markQuestAsRead', async (req, res) => {
    const { hunterName, questId } = req.body; // ハンター名を受け取る
    try {
        // ハンター名からハンターのIDを取得
        const hunter = await Hunters.findOne({
            where: {
                user_name: hunterName,
            },
        });

        if (!hunter) {
            return res.status(404).json({ error: 'Hunter not found' });
        }
        // ハンターIDとクエストIDを使用してユーザークエストを検索
        let userQuest = await UserQuest.findOne({
            where: {
                userId: hunter.id, // ハンターのIDを使用
                questId,
            },
        });
        
        if (!userQuest) {
            // 該当のレコードが存在しない場合、新しいレコードを作成
            userQuest = await UserQuest.create({
                userId: hunter.id,
                questId,
                isRead: true,
            });
        } else {
            // レコードが存在する場合、isRead を更新
            userQuest.isRead = true;
            await userQuest.save();
        }
        res.status(200).json({ message: 'Quest marked as read successfully' });
    } catch (e) {
        console.error(e); // エラーメッセージをコンソールに出力
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
