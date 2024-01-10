const express = require('express');
const router = express.Router();
const Hunters = require('../models/hunter.model');

router.get('/getHunters', async (req, res) => {
    try {
        // Hunters モデルの全インスタンスを取得
        const hunters = await Hunters.findAll();

        // user_name 属性のみをリストに格納
        const hunterNames = hunters.map((hunter) => hunter.user_name);

        // JSON レスポンスとして hunterNames を返す
        return res.json(hunterNames);
    } catch (e) {
        return res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
