const onSignIn = async (googleUser) => {
    console.log("reached in side onsignin js");
    var id_token = await googleUser.getAuthResponse().id_token;
    fetch( "http://localhost:3000/google-sign-in" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token : id_token}),
        })
    .then( res  => res.json())
    .then( data => {
        console.log(data);
        signOut();
        location.assign('/dashboard');
    })
    .catch( e => console.log(e))
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => console.log('User signed out.'));
}