const express = require('express')
const router = express.Router()
const {createItem, getAllItem, getItemByCode, createTest} = require('../handler/itemHandler')

// router.post('/test', createTest)
router.post('/insert-item', createItem);
router.get('/', getAllItem);
router.get('/code', getItemByCode);

module.exports = router
