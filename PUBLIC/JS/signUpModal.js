var navbarRegister= document.getElementById('RegisterNow');
var navbarSignIn= document.getElementById('SignIn');
var btnRegister= document.getElementById('btnRegister');
var btnSignIn= document.getElementById('btnSignIn');

btnRegister.addEventListener('click', function(){
    document.getElementById("tab-2").checked = true;
})

btnSignIn.addEventListener('click', function(){
    document.getElementById("tab-1").checked = true;
})

navbarRegister.addEventListener('click', function(){
    document.getElementById("tab-2").checked = true;
})

navbarSignIn.addEventListener('click', function(){
    document.getElementById("tab-1").checked = true;
})