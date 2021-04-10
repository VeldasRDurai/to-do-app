const hideProfile = () => {
    console.log("hidede ");
    document.getElementById('profile').style.display = "none";
}
const logOut = () => {
    let conformation = window.confirm("Do you want to log Out ?");
    if( conformation ){
        fetch( "http://localhost:3000/log-out" )
        .then(data => {
            console.log('Success:', data);
            window.location.replace("http://localhost:3000/");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}