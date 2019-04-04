const express = require('express')
const router = express.Router()
const githubController = require('../../controllers/githubController')

//Routes
router.post('/', githubController.signIn)

module.exports = router