const showNote = ( e ) => {
    const id = e.id;
    // console.log(id);
    fetch( "https://to-do-app-das.herokuapp.com/dashboard/note" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id : id }),
        })
        .then(response => response.json() )
        .then(data => {
            console.log('Success:', data);
            document.getElementById("dash-content").style.display = "none";
            document.getElementById("note").style.display         = "block";
            document.getElementById("note").className = data._id ;
            document.getElementById("note-title-1").innerText = data.heading ;
            document.getElementById("note-title-2").innerText = new Date(data.time).toLocaleDateString() + " " + new Date(data.time).toLocaleTimeString();
            document.getElementById("note-content-value").innerText = data.content ;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const newNote = () => {
    fetch( "https://to-do-app-das.herokuapp.com/dashboard/new-note" )
        .then(response => response.json() )
        .then(data => {
            console.log('Success:', data);
            document.getElementById("dash-content").style.display = "none";
            document.getElementById("note").style.display         = "block";
            document.getElementById("note").className = data._id ;
            document.getElementById("note-title-1").innerText = data.heading ;
            document.getElementById("note-title-2").innerText = new Date(data.time).toLocaleDateString() + " " + new Date(data.time).toLocaleTimeString();
            document.getElementById("note-content-value").innerText = data.content ;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

const showDash = () => {
    document.getElementById("dash-content").style.display = "flex";
    document.getElementById("note").style.display         = "none";
}