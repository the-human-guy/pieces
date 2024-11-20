// ==UserScript==
// @name        yt enhancements
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// @author      -
// @description 11/20/2024, 4:55:38 PM
// ==/UserScript==

function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }


// make hoverable progress bar area thiccer, easier to hover along
addStyle(`
    .ytp-progress-bar-padding {
            height: 70px !important;
    }
`);
