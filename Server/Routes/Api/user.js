const express = require('express');
const router = express.Router();
const userService = require('../../Controllers/Service/userService')

router.get('/use', async (req, res) => {
    try {
        const users = await userService.fetchdata();
        res.status(200).json({ message: "Data fetched successfully", users });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router