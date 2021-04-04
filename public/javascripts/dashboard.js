const showNote = ( e ) => {
    const id = new Date(e.id).getTime();
    fetch( "http://localhost:3000/dashboard/note" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id : id }),
        })
        .then(response => response.json() )
        .then(data => {
            console.log('Success:', data);
            document.getElementById("dash-content").style.display = "none";
            document.getElementById("note").style.display         = "block";
            document.getElementById("note").className = data.id ;
            document.getElementById("note-title-1").innerText = data.heading ;
            document.getElementById("note-title-2").innerText = new Date(data.id).toLocaleDateString() + " " + new Date(data.id).toLocaleTimeString();
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