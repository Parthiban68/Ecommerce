const express = require('express');
const router = express.Router();
const userService = require('../../Controllers/Service/userService')

router.get('/use', async (req, res,next) => {
    try {
        const users = await userService.fetchdata();
        res.status(200).json({ message: "Data fetched successfully", users });
    } catch (error) {
       next(error)
    }
});

module.exports = router