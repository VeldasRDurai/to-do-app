const remove = (x) => {
    x.getElementsByClassName('txt-label')[0].style.display = "none" ;
    var y = x.getElementsByClassName('txt')[0]
    // console.log(y);
    y.style.display = 'block' ;
    y.contentEditable= true;
    y.spellcheck = false;
    y.focus();
    
}

const addIfNotEmpyt = (y) => {
    if (y.innerText === ""){
        y.previousElementSibling.style.display = "block" ;
        y.style.display = "none" ;
    }
    // else{
    //     console.log(y.innerText);
    // }
}

const hidePassword = () => {
    const password = document.getElementById('password-txt').innerText;
    document.getElementById('password-txt').innerText = '*' * Number( password.length );
}

const validation = ( loc ) => {
    var email = document.getElementById("email-txt").innerText.trim();
    var password = document.getElementById("password-txt").innerText.trim();

    // create a function to cheack validation
    let valid = true;
    if( valid ){
        let data = {};
        console.log( typeof loc);
        console.log( 'sign-up' );
        console.log( loc === 'sign-up' );
        if ( loc === 'sign-up' ){
            var name  = document.getElementById("name-txt").innerText.trim();
            data = { email : email , name : name , password : password };
        } else {    
            data = { email : email , password : password };
        }
        console.log(data);
        fetch( "http://localhost:3000/"+loc , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data ),
        })
        .then(data => {
            console.log('Success:', data);
            if ( data.status === 200 ){
                if(  loc === 'sign-up'){
                    window.location.href = "http://localhost:3000/sign-up/sign-up-verifictaion";
                } else {
                    window.location.href = "http://localhost:3000/dashboard";
                }
            } else if( data.status !== 500 ) {
                data.text().then( msg => {
                    console.log(msg);
                    // document.getElementById('result').style.color = "red" ;
                    document.getElementById('result').innerText = "*" + msg ;
                })
            }
        })
        .catch((error) => {
            console.error('Error:'+ error);
            console.log(error.data);
        });
    }
}

const codeVerification = () => {
    var verificationCode  = document.getElementById("verification-code-txt").innerText.trim();
    // create a function to cheack validation
    let valid = true;
    if( valid ){
        fetch( "http://localhost:3000/sign-up/sign-up-verification" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { verificationCode : verificationCode } ),
        })
        .then(data => {
            console.log('Success:', data);
            if ( data.status === 200 ){
                window.location.href = "http://localhost:3000/dashboard";
            } else {
                data.text().then( msg => {
                    console.log(msg);
                    // document.getElementById('result').style.color = "red" ;
                    document.getElementById('result').innerText = "*" + msg ;
                })
            }
        })
        .catch((error) => {
            console.error('Error:'+ error);
            console.log(error.data);
        });       
    }
}