const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Hunters = require('../models/hunter.model');

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'ユーザー名とパスワードは必須です。' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Hunters.create({ user_name: username, password: hashedPassword });

        res.status(200).json({ message: 'アカウントが作成されました。', user: user.user_name });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
