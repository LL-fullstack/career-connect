'use strict'; 

const loginButton =  document.getElementById('loginButton');
const inputEmail =  document.getElementById('input-email');
const inputPassword =  document.getElementById('input-password');

function setCredentials(username, password) {
    localStorage.setItem("storedUsername", username);
    localStorage.setItem("storedPassword", password);
}

function validateCredentials(username, password) {
    const storedUsername = localStorage.getItem("storedUsername");
    const storedPassword = localStorage.getItem("storedPassword");
    if(username === storedUsername && password === storedPassword) {
        return true;
    } else {
        return false;
    }
}

function clearLoginDetails() {
    inputEmail.value = '';
    inputPassword.value = '';
}

function setLoginButton() {
    loginButton.addEventListener('click', function() {
        const email = inputEmail.value;
        const password = inputPassword.value;
        console.log(`login ${email} ${password}`);
        const valid = validateCredentials(email, password);
        clearLoginDetails();
        if(valid === true) {
            window.location.assign("home.html");
        } else {
            alert("'Incorrect username or password");
        }
    });
}

setCredentials("ll@mitt.ca", "Password@123");
setLoginButton();