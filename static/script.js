var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var isChrome =
  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari =
  /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
var mailTo = function() {
  if (isSafari) {
    window.location.href =
      "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
  } else {
    var new_window = window.open("", "_blank");
    new_window.location.href =
      "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
  }
};

var stopOnclick = function(event) {
  event.stopPropagation();
};

window.addEventListener(
  "load",
  function load() {
    window.removeEventListener("load", load, false);
    document.getElementById("main-logo-wrapper").classList.remove("fade-out");
    setTimeout(function() {
      document.getElementById("middle-text").classList.remove("fade-in");
      document.getElementById("growing-icon").classList.remove("fade-in");
      document.getElementById("footer").classList.remove("fade-in");
    }, 1300);
    setTimeout(function() {
      document.getElementById("mymuseum-logo").classList.remove("fade-in");
    }, 2000);
    setTimeout(function() {
      document.getElementById("gallerist-logo").classList.remove("fade-in");
    }, 2250);
    setTimeout(function() {
      document.getElementById("private-logo").classList.remove("fade-in");
    }, 2500);
    setTimeout(function() {
      document.getElementById("artist-logo").classList.remove("fade-in");
    }, 2750);
  },
  false
);
