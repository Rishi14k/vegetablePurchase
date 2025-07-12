const express = require('express')
const {createGEntry,getGEntry,downloadGExcel} = require('../controllers/entryGController')

const router = express.Router()

router.post('/entriesG',createGEntry)
router.get('/entriesG',getGEntry)
router.get('/downloadG',downloadGExcel)

module.exports = router