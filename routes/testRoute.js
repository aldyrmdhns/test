const express = require('express')
const router = express.Router()
const Notification = require('../handler/testHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/notification-test', Notification)

module.exports = router