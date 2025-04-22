// ==UserScript==
// @name        Improve YT
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// @author      -
// @description 4/1/2025, 8:01:34 AM
// ==/UserScript==

const $$ = document.querySelectorAll.bind(document)

// External links in description
const cuckedLinksSelector = 'a[href^="https://www.youtube.com/redirect?"]'

// make links clickable without warnings
const uncuckLinks = () => {
  // links that are leading to google's warning page "Are you sure you want to foolow this link etc etc"
  $$(cuckedLinksSelector).forEach((link, i) => {
    link.href = new URLSearchParams(new URL(link.href).search).get('q')
    link.style.textShadow = '0 0 3px green'
    link.style.color = 'green'
  })

}

setTimeout(uncuckLinks, 2000)
setTimeout(uncuckLinks, 5000)

setInterval(uncuckLinks, 7000)