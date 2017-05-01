let ScrollOver = require("./lib/ScrollOver.js")
let animateScroll = require("./lib/animatescroll.js")

let body = document.querySelectorAll("body")[0]
let tagline = document.querySelectorAll(".tagline")[0]

let iphone = document.querySelectorAll(".phone-wrap--iphone")[0],
    android = document.querySelectorAll(".phone-wrap--android")[0],
    features = document.querySelectorAll(".features-wrap")[0],
    slideTwo = document.querySelectorAll(".slide--two")[0],
    slideThree = document.querySelectorAll(".slide--three")[0],
    slideSix = document.querySelectorAll(".slide--six")[0],
    cookieButton = document.querySelectorAll(".cookie-popup-button")[0]

setTimeout(() => body.classList.add("shown"), 400)

let statusCookiePolicyAccepted = readCookie("status-cookie-policy")
if (statusCookiePolicyAccepted == "accepted") {
  hideCookiePopup()
}

document.querySelectorAll(".button--more")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".nav__item--features")[0].addEventListener('click', function(event){
    animateScroll(slideTwo, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

document.querySelectorAll(".nav__item--about")[0].addEventListener('click', function(event){
    animateScroll(slideThree, 600, "easeInOutCubic", 0)
    event.preventDefault()
})

cookieButton.addEventListener('click', function(event){
    createCookie("status-cookie-policy", "accepted", 30)
    hideCookiePopup()
    event.preventDefault()
})

document.querySelectorAll(".button--scroll-top")[0].addEventListener('click', function(event){
    animateScroll(body, 600, "easeInOutCubic", 0)
    setTimeout(function(){
      document.querySelectorAll(".email-form__input--email")[0].focus()
    }, 1000)
    event.preventDefault()
})


new ScrollOver({
  keyframes : [
    {
      element : iphone,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 60]
        }
      ]
    },
    {
      element : android,
      domain : [0, 800],
      animate: [
        {
          property : "translateY",
          range : [0, 110]
        }
      ]
    },
    {
      element : features,
      domain : [200, 800],
      animate: [
        {
          property : "translateY",
          range : [0, -40]
        }
      ]
    },
    {
      element : slideTwo,
      reveal:
        {
          when : 700,
          className: "slide--shown"
        }

    },
    {
      element : slideThree,
      reveal:
        {
          when : 1400,
          className: "slide--shown"
        }
    },
    {
      element : slideSix,
      reveal:
        {
          when : 2190,
          className: "slide--shown"
        }
    }
  ]
}).init()

function hideCookiePopup() {
  document.querySelectorAll(".cookie-popup__inner")[0].style.display = "none"
  return true
}

// Create cookie
function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

// Read cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

// Erase cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
}
