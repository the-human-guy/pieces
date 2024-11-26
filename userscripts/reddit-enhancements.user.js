// ==UserScript==
// @name        New script reddit.com
// @namespace   Violentmonkey Scripts
// @match       https://www.reddit.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/26/2024, 5:50:32 AM
// ==/UserScript==

if (location.host.startsWith('www.')) {
  var btnContainer = document.createElement('div')
  btnContainer.style = "position: absolute; z-index: 99999; background: black;"
  var linkToOld = document.createElement('a')
  linkToOld.href = location.href.replace('www.', 'old.')
  linkToOld.innerText = 'Switch to old.'
  btnContainer.appendChild(linkToOld)
  document.body.prepend(btnContainer)
}