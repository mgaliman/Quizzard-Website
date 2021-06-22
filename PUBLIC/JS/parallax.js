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