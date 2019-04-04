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
    <form style="width:50%" onsubmit="unstarRepo()" id="unstarRepo">
    <div class="form-group">
        <input type="text" class="form-control" id="owner" placeholder="username">
    </div>
    <div class="form-group">
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
    // $('#getUnstarRepoForm').empty()
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

$(document).ready(function () {
    $('#unstarRepo').submit(() => {
        unstarRepo()
    })
})