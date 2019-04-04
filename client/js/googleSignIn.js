function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.



    $.post('http://localhost:3000/signIn', { token: id_token })
        .done((response) => {
            localStorage.setItem('token', response.userToken)
        })
        .fail((jqXHR, textStatus) => {
            console.log('Request failed!', textStatus)
        })
}