const axios = require('axios')
let ax = axios.create({
    baseURL: 'https://api.github.com'
})
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
        const { owner, repo } = req.query
        ax
            .get('/user/starred')
            .then(({ data }) => {
                if (!req.query) res.status(200).json(data)
                else {
                    data.filter(repository => { repository.owner.login == owner && repository.name == repo })
                    res.status(200).json(data[0])
                }
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
}

module.exports = githubController
