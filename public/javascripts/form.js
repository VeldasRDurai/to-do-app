const validation = ( loc ) => {
    var username = document.getElementById("form-username").value.trim();
    var password = document.getElementById("form-password").value.trim();

    // create a function to cheack validation
    let valid = true;
    if( valid ){
        const data = { username : username , password : password };

        fetch( "http://localhost:3000/"+loc , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(data => {
            console.log('Success:', data);
            window.location.href = "http://localhost:3000/dashboard";
        })
        .catch((error) => {
            console.error('Error:'+ error);
        });
    }
}