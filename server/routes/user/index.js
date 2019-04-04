const express = require('express')
const router = express.Router()
const githubController = require('../../controllers/githubController')

//Routes
router.get('/getRepos/:user', githubController.getRepos)
router.post('/createRepo', githubController.createRepo)
router.delete('/deleteRepo/:owner/:repo', githubController.deleteRepo)
router.get('/getStarredRepos', githubController.getStarredRepos)
router.get('/findStarredRepo/:owner', githubController.findStarredRepo)
router.get('/searchRepo/:user', githubController.searchRepo)
router.delete('/unstarRepo/:owner/:repo', githubController.unstarRepo)

module.exports = router