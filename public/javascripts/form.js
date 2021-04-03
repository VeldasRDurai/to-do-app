const validation = () => {
    var username = document.getElementById("form-username").value.trim();
    var password = document.getElementById("form-password").value.trim();

    // create a function to cheack validation
    let valid = true;
    if( valid ){
        const data = { username : username , password : password };

        fetch( "http://localhost:3000/log-in" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(data => {
            console.log('Success:', data);
            if( data.status === 200 ){
                fetch( "http://localhost:3000/dashboard/")
                .then( data2 => {
                    console.log('Success 2 :', data2);
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}