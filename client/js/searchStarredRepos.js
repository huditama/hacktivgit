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
    <form style="width:70%" onsubmit="searchStarredRepos()" id="searchStarredRepos">
    <div class="form-group">
        <input type="text" class="form-control" id="owner" placeholder="username">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `
    $('#getSearchForm').html(html)
}

function searchStarredRepos() {
    event.preventDefault()
    $('#starredRepo').empty()
    // $('#getSearchForm').empty()
    $('#getCreateRepoForm').empty()
    $('#successCreateRepoAlert').empty()
    $('#getUnstarRepoForm').empty()
    $('#successUnstarRepoAlert').empty()
    $('#getSearchUserRepoForm').empty()
    $('#searchUserRepoResult').empty()

    let owner = $('#owner').val()

    $.ajax({
        url: `http://localhost:3000/users/findStarredRepo/${owner}`,
        method: 'GET'
    })
        .done((response) => {
            let html = `
            <h6>Your Search Result</h6>
            <table class="table table-striped" style="width:80%">
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
            $('#searchStarredRepoResult').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

$(document).ready(function () {
    $('#searchStarredRepos').submit(() => {
        searchStarredRepos()
    })
})