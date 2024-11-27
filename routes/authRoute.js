const express = require('express')
const router = express.Router()
const login = require('../handler/authHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/test-middleware', authMiddleware, (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "This is a test for the Middleware Logic"
    })
})

module.exports = router