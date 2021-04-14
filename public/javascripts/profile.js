const hideProfile = () => {
    console.log("hidede ");
    document.getElementById('profile').style.display = "none";
}
const logOut = () => {
    let conformation = window.confirm("Do you want to log Out ?");
    if( conformation ){
        fetch( "https://to-do-app-das.herokuapp.com/log-out" )
        .then(data => {
            console.log('Success:', data);
            window.location.replace("https://to-do-app-das.herokuapp.com/");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}