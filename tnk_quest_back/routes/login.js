const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Hunters = require('../models/hunter.model');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'ユーザー名とパスワードを指定してください' });
        }

        const user = await Hunters.findOne({ where: { user_name: username } });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'ログイン成功', user: user.user_name });
        } else {
            res.status(401).json({ error: 'パスワードが間違っています' });
        }
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
