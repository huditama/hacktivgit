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
    <form style="width:50%;margin-top:10%" onsubmit="getUserRepo()" id="getUserRepo">
    <div class="form-group">
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
        <div class=scrollable>
            <table data-toggle="table" id="dtVerticalScrollExample" class="table table-striped" style="width:40%">
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
            html += `
             </table>
            </div>
            `
            $('#searchUserRepoResult').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}

$(document).ready(function () {
    $('#getUserRepo').submit(() => {
        getUserRepo()
    })
})