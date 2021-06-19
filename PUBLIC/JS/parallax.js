// var room=document.getElementById("room");
// var wizard=document.getElementById("wizard");
// var ghost=document.getElementById("ghost");
// var smoke=document.getElementById("smoke");
// var welcomeText=document.getElementById("text");

// window.addEventListener('scroll',function(){
//     var value= window.scrollY;
//     room.style.top=value * 0.5 + 'px';
//     ghost.style.left= value * 0.3 + 'px';
//     smoke.style.top=value * 0.8 + 'px';
//     wizard.style.bottom = -value * 0.5 + 'px';
//     welcomeText.style.top=value * 0.5 + 'px';
// })

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

var video=document.getElementById('library');
var indicatorDown=document.getElementById('indicatorDown');
window.addEventListener('scroll', function(){
    var value= 1 + window.scrollY/-600;
    video.style.opacity=value;
    indicatorDown.style.opacity=value;
})