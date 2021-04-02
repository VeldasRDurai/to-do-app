const edit = () => {
    if (document.getElementById("edit").innerText === "Edit" ){
        var box = document.getElementById("note-content-value")
        box.contentEditable = true ;
        box.spellcheck = false ;
        box.focus();
        document.getElementById("edit").innerText = "Update" ;
    } else {
        var box = document.getElementById("note-content-value")
        box.contentEditable = false ;
        document.getElementById("edit").innerText = "Edit" ;
    }
}