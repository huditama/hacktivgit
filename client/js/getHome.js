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

$(document).ready(function () {
    getHome()
})