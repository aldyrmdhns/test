const express = require('express')
const router = express.Router()
const {createUser, getAllUser, createDeparture, getAllDeparture, getDeparture} = require('../handler/userHandler')



router.post('/departure/create', createDeparture);
router.get('/departure', getAllDeparture);
router.get('/departure/test', getDeparture);

router.post('/register', createUser);
router.get('/', getAllUser);

module.exports = router
