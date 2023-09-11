/*
* Javascript to show and hide cookie banner using localstorage
*/

/**
 * @description Shows the cookie banner
 */
 function showCookieBanner(){
  let cookieBanner = document.getElementById("cookie-container");
  cookieBanner.style.display = "block";
}

/**
* @description Hides the Cookie banner when user clicks 'Accept' and saves the value to localstorage
*/
function hideAcceptCookieBanner(){
  localStorage.setItem("ga_isCookieAccepted", "accept");

  let cookieBanner = document.getElementById("cookie-container");
  cookieBanner.style.display = "none";
}

/**
* @description Hides the Cookie banner when user clicks 'Reject' and saves the value to localstorage
*/
function hideRejectCookieBanner() {
  localStorage.setItem("ga_isCookieAccepted", "reject");

  let cookieBanner = document.getElementById("cookie-container");
  cookieBanner.style.display = "none";
}

/**
* @description Checks the localstorage and shows Cookie banner based on it.
*/
function initializeCookieBanner(){
  let isCookieAccepted = localStorage.getItem("ga_isCookieAccepted");
  if(isCookieAccepted === null)
  {
      localStorage.setItem("ga_isCookieAccepted", "no");
      showCookieBanner();
  }
  if(isCookieAccepted === "no"){
      showCookieBanner();
  }
}

// Assigning values to window object
window.onload = initializeCookieBanner();
window.ga_hideAcceptCookieBanner = hideAcceptCookieBanner;
window.ga_hideRejectCookieBanner = hideRejectCookieBanner;
