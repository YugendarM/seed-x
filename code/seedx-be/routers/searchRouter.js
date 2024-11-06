const express = require('express')
const { getSearchResults } = require('../controllers/searchController')
const router = express.Router()

router.get("/:query", getSearchResults)

module.exports = router