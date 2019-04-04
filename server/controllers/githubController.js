const axios = require('axios')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const { sign, verify } = require('../helpers/jwt')
const User = require('../models/user')

let ax = axios.create({ baseURL: 'https://api.github.com' })
ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
class githubController {
    static getRepos(req, res) {
        const { user } = req.params
        ax
            .get(`/users/${user}/repos`)
            .then(({ data }) => { res.status(200).json(data) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static createRepo(req, res) {
        const { name, description } = req.body
        ax
            .post('/user/repos', { name, description })
            .then(({ data }) => { res.status(201).json({ message: 'Successfully created repo!', data }) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static deleteRepo(req, res) {
        const { owner, repo } = req.params
        ax
            .delete(`/repos/${owner}/${repo}`)
            .then(({ data }) => { res.status(200).json({ message: 'Successfully deleted repo!', data }) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static getStarredRepos(req, res) {
        ax
            .get('/user/starred')
            .then(({ data }) => { res.status(200).json(data) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static findStarredRepo(req, res) {
        const { owner } = req.params
        ax
            .get('/user/starred')
            .then(({ data }) => {
                let filteredData = data.filter((repo) => repo.owner.login == owner)
                res.status(200).json(filteredData)
            })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static searchRepo(req, res) {
        const { user } = req.params
        ax
            .get(`/users/${user}/repos`)
            .then(({ data }) => { res.status(200).json(data) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static unstarRepo(req, res) {
        const { owner, repo } = req.params
        ax
            .delete(`/user/starred/${owner}/${repo}`)
            .then(({ data }) => { res.status(200).json({ message: 'Successfully unstarred repo!', data }) })
            .catch((err) => { res.status(400).json(err.message) })
    }

    static signIn(req, res) {
        const { token } = req.body
        let payload;
        let userToken;
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then((ticket) => {
                payload = ticket.getPayload()
                const userid = payload['sub']
                return User
                    .findOne({ email: payload.email })
            })
            .then((findOneUser) => {
                const { name, email, picture } = payload
                if (!findOneUser) {
                    return User
                        .create({ name, email, password: 12345, picture })
                } else {
                    const { id, name, email, picture } = findOneUser
                    const existingUserPayload = { id, name, email, picture }
                    userToken = sign(existingUserPayload)
                    res.status(200).json({ message: '(EXISTING) You are now logged in via Google Sign In!', userToken })
                }
            })
            .then((createdUser) => {
                const { id, name, email, picture } = createdUser
                const newUserPayload = { id, name, email, picture }
                userToken = sign(newUserPayload)
                res.status(200).json({ message: '(NEW) You are now logged in via Google Sign In!', userToken })
            })
            .catch((err) => { res.status(400).json(err.message) })
    }
}

module.exports = githubController
