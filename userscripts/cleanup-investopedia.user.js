// ==UserScript==
// @name        cleanup-investopedia
// @namespace   Violentmonkey Scripts
// @match       https://www.investopedia.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/2/2024, 11:38:20 PM
// ==/UserScript==

setInterval(() => {
  const annoyances = document.querySelectorAll('.jw-reset')
  annoyances.forEach(annoyance => annoyance.remove())
  document.querySelectorAll('*[class*=video-container]').forEach(el => el.remove())
}, 3000)

