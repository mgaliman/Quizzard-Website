// var oassword = document.getElementById('password');
// var oassword = document.getElementById('confirmPassword');
// function submit(evt) {
//     this.pr();
//     if ()

//     window.location.href = `/`;
// }
const { email } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

var form = document.getElementById("changePswForm");

form.innerHTML += `<input name="emailHash" value="${email}" style="display:none"></input>`;
function AddEmailToForm(email) {
}