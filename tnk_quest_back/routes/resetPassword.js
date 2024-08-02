const express = require('express');
const bcrypt = require('bcrypt');
const Hunters = require('../models/hunter.model');

const router = express.Router();

router.post('/reset-password', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Hunters.findOne({ where: { user_name: username } });

    if (!user) {
      return res.status(404).json({ message: 'ユーザーが見つかりません。' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'パスワードがリセットされました。' });
  } catch (error) {
    res.status(500).json({ message: 'サーバーエラーが発生しました。', error });
  }
});

module.exports = router;
