const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.model');

router.post('/addComments', async (req, res) => {
    try {
        const { questId, hunterName, content} = req.body;

        if (!questId || !hunterName || !content) {
            return res.status(400).json({error: "Quest ID, hunter name, and content are required." });
        }

        // 新しいコメントオブジェクトを作成
        const NewComment = await Comments.create({ questId, hunterName, content });
        
        // 作成したコメントをレスポンスとして返す
        res.status(200).json(NewComment);
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: e.toString() });
    }
});

module.exports = router;
