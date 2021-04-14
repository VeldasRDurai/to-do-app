const showProfile = () => {
    console.log("show profile");
    fetch("https://to-do-app-das.herokuapp.com/dashboard/profile")
    .then( res => res.json() )
    .then( data => {
        let pro = document.getElementById('profile');
        if ( pro.style.display === "flex"){
            pro.style.display  = "none";
        } else {
            pro.style.display  = "flex";
        }
        document.getElementById('pro-email').innerText = data.email;
        document.getElementById('pro-name').innerText = data.name ;
    })
    .catch( e => console.log(e))
}