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
    <form style="width:50%" onsubmit="createNewRepo()" id="createNewRepo">
    <div class="form-group">
        <input type="text" class="form-control" id="name" placeholder="repo name">
    </div>
    <div class="form-group">
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
            <div class="alert alert-primary" role="alert">
              You have successfully created ${response.data.name}!
            </div>
            `
            $('#successCreateRepoAlert').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

$(document).ready(function () {
    $('#createNewRepo').submit(() => {
        createNewRepo()
    })
})