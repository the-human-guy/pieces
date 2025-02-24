// ==UserScript==
// @name        New script reddit.com
// @namespace   Violentmonkey Scripts
// @match       https://*.reddit.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/26/2024, 5:50:32 AM
// ==/UserScript==

if (location.host.startsWith('www.')) {
  var btnContainer = document.createElement('div')
  btnContainer.style = "position: fixed; z-index: 99999; background: black; top: 0; left: 0"
  var linkToOld = document.createElement('a')
  linkToOld.href = location.href.replace('www.', 'old.')
  linkToOld.innerText = 'Switch to old.'
  btnContainer.appendChild(linkToOld)
  document.body.append(btnContainer)
}

// replace www. with old. in all links on the page
function oldifyLinks() {
  document.querySelectorAll('a[href*="www.reddit"]').forEach(link => link.href = link.href.replace('www.', 'old.'))
}

oldifyLinks()

setInterval(oldifyLinks, 7000)