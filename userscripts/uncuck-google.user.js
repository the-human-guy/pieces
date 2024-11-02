// ==UserScript==
// @name           uncuck-google
// @description    Default to safe=off, english lang, fix links
// @include        http*://*.google.*/search*
// @include        http://*.google.*/imgres*
// @version        1.01
// @grant          none
// ==/UserScript==

const imgSearchGatedLinkSelector = '[href^="https://www.google.com/url?sa=i&url="]'
const imgSearchPreviewLinkSelector = `.trXfzf a[jsaction]:not([uncucked])`

// set en lang and remove safesearch filter (unblur imgs)
let url = window.location.href;
const safe = "&safe=off&hl=en";
if (!url.includes(safe)) {
  url += safe;
  window.location = url;
}

// make links clickable without warnings
const uncuckLinks = () => {
  // links that are leading to google's warning page "Are you sure you want to foolow this link etc etc"
  document.querySelectorAll(imgSearchGatedLinkSelector).forEach((link, i) => {
    link.href = unescape(link.href.split('url=')[1])
    link.style.backgroundColor = 'green'
  })

  // links which href will be transformed from legit to gated on focus or click.
  document.querySelectorAll(imgSearchPreviewLinkSelector).forEach((link, i) => {
    const newLink = link.cloneNode(true); // true means children too
    newLink.removeAttribute('jsaction')
    newLink.style.backgroundColor = 'greenyellow'
    newLink.setAttribute('uncucked', true)
    link.parentNode.replaceChild(newLink, link);
  })
}

setTimeout(uncuckLinks, 3000)
setTimeout(uncuckLinks, 7000)
setTimeout(uncuckLinks, 13000) // for really slow PCs / connections

// watch for browser history updates to catch new links to fix
window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    setTimeout(uncuckLinks, 3000) // let all links render
    return target.apply(thisArg, argArray);
  },
});
