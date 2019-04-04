const express = require('express')
const router = express.Router()
const user = require('./user')
const signIn = require('./signIn')

router.use('/signIn', signIn)
router.use('/users', user)

module.exports = router