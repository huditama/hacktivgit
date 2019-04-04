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
            <h6 style="margin-top:3"%>Your Starred Repos</h6>
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
            $('#starredRepo').html(html)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed', textStatus)
        })
}