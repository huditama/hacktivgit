function getHome() {
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#getCreateRepoForm').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    $.ajax({
        url: 'http://localhost:3000/users/getRepos/huditama',
        method: 'GET'
    })
        .done((response) => {
            let html = `
        <h6>Your Repos</h6>
        <table class="table table-striped" style="width:40%">
            <thead>
                <tr>
                    <th scope="col">Repo Name</th>
                </tr>
            </thead>
        `
            response.forEach((repo) => {
                html += `
            <tbody>
                <tr>
                    <td>${repo.name}</td>
                </tr>
            </tbody>
            `
            })
            html += `</table>`
            let htmlAvatar = `
            <img src='${response[0].owner.avatar_url}' width="200" height="200">
            <h5 style='margin-left:6%'>${response[0].owner.login}</h5>
            `
            $('#starredRepo').html(html)
            $('#userAvatar').html(htmlAvatar)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })

}

function getStarredRepos() {
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#getCreateRepoForm').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    $.ajax({
        url: 'http://localhost:3000/users/getStarredRepos',
        method: 'GET'
    })
        .done((response) => {
            let html = `
            <h6>Your Starred Repos</h6>
            <table class="table table-striped" style="width:40%">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Repo Name</th>
                    </tr>
                </thead>
            `
            response.forEach((repo) => {
                html += `
                <tbody>
                    <tr>
                        <td>${repo.owner.login}</td>
                        <td>${repo.name}</td>
                    </tr>
                </tbody>
                `
            })
            html += `</table>`
            $('#starredRepo').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

function getSearchForm() {
    $('#starredRepo').empty()
    $('#searchStarredRepoResult').empty()
    $('#getCreateRepoForm').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let html = `
    <h5>Search From Your Starred Repo</h5>
    <form style="width:30%" onsubmit="searchStarredRepos()" id="searchStarredRepos">
    <div class="form-group">
        <label for="formGroupExampleInput">Username</label>
        <input type="text" class="form-control" id="owner" placeholder="username">
    </div>
    <div class="form-group">
        <label for="formGroupExampleInput2">Repo Name</label>
        <input type="text" class="form-control" id="repoName" placeholder="repo name">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    $('#getSearchForm').html(html)
}

function searchStarredRepos() {
    event.preventDefault()
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#getCreateRepoForm').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let owner = $('#owner').val()
    let repoName = $('#repoName').val()

    $.ajax({
        url: `http://localhost:3000/users/findStarredRepo/?repo=${repoName}&owner=${owner}`,
        method: 'GET'
    })
        .done((response) => {
            let html = `
            <h6>Your Search Result</h6>
            <table class="table table-striped" style="width:40%">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Repo Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${response.owner.login}</td>
                        <td>${response.name}</td>
                    </tr>
                </tbody>
            </table>
        `
            $('#searchStarredRepoResult').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

function getCreateRepoForm() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let html = `
    <h5>Create a New Repo</h5>
    <form style="width:30%" onsubmit="createNewRepo()" id="createNewRepo">
    <div class="form-group">
        <label for="formGroupExampleInput">Repo Name</label>
        <input type="text" class="form-control" id="name" placeholder="repo name">
    </div>
    <div class="form-group">
        <label for="formGroupExampleInput2">Description</label>
        <input type="text" class="form-control" id="description" placeholder="description">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    $('#getCreateRepoForm').html(html)
}

function createNewRepo() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let name = $('#name').val()
    let description = $('#description').val()

    $.ajax({
        url: `http://localhost:3000/users/createRepo`,
        method: 'POST',
        data: { name, description }
    })
        .done((response) => {
            let html = `
            <div class="alert alert-primary" role="alert" style="width:40%">
              You have successfully created ${response.data.name}!
            </div>
            `
            $('#successCreateRepoAlert').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

function getUnstarRepoForm() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getCreateRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let html = `
    <h5>Unstar a Repo</h5>
    <form style="width:30%" onsubmit="unstarRepo()" id="unstarRepo">
    <div class="form-group">
        <label for="formGroupExampleInput">Username</label>
        <input type="text" class="form-control" id="owner" placeholder="username">
    </div>
    <div class="form-group">
        <label for="formGroupExampleInput2">Repo Name</label>
        <input type="text" class="form-control" id="repo" placeholder="repo name">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    $('#getUnstarRepoForm').html(html)
}

function unstarRepo() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getCreateRepoForm').empty()
    $('#getUnstarRepoForm').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let owner = $('#owner').val()
    let repo = $('#repo').val()

    $.ajax({
        url: `http://localhost:3000/users/unstarRepo/${owner}/${repo}`,
        method: 'DELETE'
    })
        .done((response) => {
            let html = `
            <div class="alert alert-primary" role="alert" style="width:40%">
              You have successfully unstarred ${repo} by ${owner}!
            </div>
            `
            $('#successUnstarRepoAlert').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

function getSearchUserRepoForm() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getCreateRepoForm').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()

    let html = `
    <h5>Search a User's List of Repo</h5>
    <form style="width:30%" onsubmit="getUserRepo()" id="getUserRepo">
    <div class="form-group">
        <label for="formGroupExampleInput">Username</label>
        <input type="text" class="form-control" id="user" placeholder="username">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    $('#getSearchUserRepoForm').html(html)
}

function getUserRepo() {
    $('#starredRepo').empty()
    $('#getSearchForm').empty()
    $('#searchStarredRepoResult').empty()
    $('#successCreateRepoAlert').empty()
    $('#getCreateRepoForm').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()

    let user = $('#user').val()

    $.ajax({
        url: `http://localhost:3000/users/searchRepo/${user}`,
        method: 'GET'
    })
        .done((response) => {
            let html = `
        <h6>${user}'s Repos</h6>
        <table class="table table-striped" style="width:40%">
            <thead>
                <tr>
                    <th scope="col">Repo Name</th>
                </tr>
            </thead>
        `
            response.forEach((repo) => {
                html += `
            <tbody>
                <tr>
                    <td>${repo.name}</td>
                </tr>
            </tbody>
            `
            })
            html += `</table>`
            $('#searchUserRepoResult').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

$(document).ready(function () {
    getHome()

    $('#searchStarredRepos').submit(() => {
        searchStarredRepos()
    })

    $('#createNewRepo').submit(() => {
        createNewRepo()
    })

    $('#unstarRepo').submit(() => {
        unstarRepo()
    })

    $('#getUserRepo').submit(() => {
        getUserRepo()
    })
})