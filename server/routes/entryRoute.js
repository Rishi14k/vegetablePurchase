const express = require('express')
const {createEntry,getEntry,downloadExcel} = require('../controllers/entryController')

const router = express.Router()

router.post('/entries',createEntry)
router.get('/entries',getEntry)
router.get('/download',downloadExcel)

module.exports = router