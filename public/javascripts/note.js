const edit = () => {
    if (document.getElementById("edit").innerText === "EDIT" ){
        var box = document.getElementById("note-content-value")
        box.contentEditable = true ;
        box.spellcheck = false ;
        var name = document.getElementById("note-title-1");
        name.contentEditable = true ;
        name.spellcheck = false ;
        box.focus();
        document.getElementById("edit").innerText = "UPDATE" ;
    } else {
        var content = document.getElementById("note-content-value");
        content.contentEditable = false ;
        content.style.wordWrap = "break-word";

        var heading = document.getElementById("note-title-1");
        heading.contentEditable = false ;

        var id = document.getElementById("note").className;
        document.getElementById("edit").innerText = "EDIT" ;

        fetch( "https://to-do-app-das.herokuapp.com/dashboard/note/update" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id : id , content:content.innerText , heading:heading.innerText }),
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}
