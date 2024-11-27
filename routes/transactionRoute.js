const express = require('express')
const router = express.Router()
const {createTransaction, getAllTransaction, midtransNotification} = require('../handler/transactionHandler');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/buy', authMiddleware, createTransaction)
router.get('/history', authMiddleware, getAllTransaction)
router.post('/notification', midtransNotification)
// router.post('/notification', midtransNotification)

module.exports = router