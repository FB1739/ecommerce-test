//error
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}

let responsePayload;
function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    responsePayload = decodeJwtResponse(response.credential);

    /*console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);*/
    localStorage.setItem("user",responsePayload.email)
    location.href = "index.html";
    

}
//login
function login() {
    let mail = document.getElementById("email").value;
    let contraseña = document.getElementById("password").value;
    if (mail != "" && contraseña.length != "") {
        localStorage.setItem("user",mail)
        location.href = "index.html";

    } else {
        showAlertError();
    }
}



function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


//se añade la funcion cuando se hace click en el boton
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("regBtn").addEventListener("click", () => {
        login();
    })
})
