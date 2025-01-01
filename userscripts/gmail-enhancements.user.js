// ==UserScript==
// @name        gmail-enhancements
// @namespace   Violentmonkey Scripts
// @match       https://mail.google.com/mail/*
// @grant       none
// @version     1.0
// @author      -
// @description 8/30/2021, 6:23:12 PM
// ==/UserScript==

var TTP = window.TTP = {createHTML: (string, sink) => string, createScript: (string, sink) => string, createScriptURL: (string, sink) => string};
if(typeof window.isSecureContext !== 'undefined' && window.isSecureContext){
    if (window.trustedTypes && window.trustedTypes.createPolicy){
        if(window.trustedTypes.defaultPolicy) {
            TTP = window.TTP = window.trustedTypes.defaultPolicy;
        } else {
            TTP = window.TTP = window.trustedTypes.createPolicy("default", TTP);
        }
    }
}

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }


// make refresh btn always visible
addStyle(`
    .bzn .G-tF .G-Ni.J-J5-Ji[style="display: none;"]:not(.G-aE) {
            display: inline-flex !important;
    }
`);


/*
  Make row delete button always visible (not just :onhover).
  And hide the other row buttons.
*/
addStyle(`

    .bq4.xY {
        display: flex !important;
    }
    .bqX {
      display: none !important;
    }
    .bqX[data-tooltip="Delete"] {
      display: inline-flex !important;
    }
`);

// mark <tr> delete btn as clickable for Vimium extension
function updateTRs() {
  const timerName = `userscript gmail enhancements interval ${Math.random()}`
  console.time(timerName)
  document.querySelectorAll('.bqX.bru').forEach(el => el.setAttribute('onclick', 'console.log'))
  console.timeEnd(timerName)
}
setTimeout(updateTRs, 3000)
setInterval(updateTRs, 11000)
