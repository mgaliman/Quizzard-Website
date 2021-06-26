var timeleft = document.getElementById('countdown').innerHTML;
var downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "00";
  } else {
    document.getElementById("countdown").innerHTML = timeleft;
    console.log(timeleft);
  }
  timeleft -= 1;
}, 1000);