const express = require('express');
const router = express.Router();
const UserThread = require('../models/readthread.model');
const Hunters = require('../models/hunter.model');

router.post('/markThreadAsRead', async (req, res) => {
    const { hunterName,questId, threadId } = req.body; // ハンター名を受け取る
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
        // ハンターIDとスレッドIDを使用してユーザークエストを検索
        let userThread = await UserThread.findOne({
            where: {
                userId: hunter.id,
                threadId,
            },
        });
        
        if (!userThread) {
            // 該当のレコードが存在しない場合、新しいレコードを作成
            userThread = await UserThread.create({
                userId: hunter.id,
                questId,
                threadId,
                isRead: true,
            });
        } else {
            // レコードが存在する場合、isRead を更新
            userThread.isRead = true;
            await userThread.save();
        }
        res.status(200).json({ message: 'Thread marked as read successfully' });
    } catch (e) {
        console.error(e); // エラーメッセージをコンソールに出力
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
