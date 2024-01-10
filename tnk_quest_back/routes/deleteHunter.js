const express = require('express');
const router = express.Router();
const Hunters = require('../models/hunter.model');

router.delete('/deleteHunter/:userName', async (req, res) => {
    const userName = req.params.userName;

    try {
        const hunter = await Hunters.findOne({ where: { user_name: userName } });
        
        if (!hunter) {
            return res.status(404).json({ error: 'Hunter not found' });
        }

        await hunter.destroy();
        res.status(200).json({ message: 'Hunter deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

module.exports = router;
