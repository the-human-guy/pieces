// ==UserScript==
// @name        Reddit oldify
// @namespace   Violentmonkey Scripts
// @match       https://*.reddit.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/26/2024, 5:50:32 AM
// ==/UserScript==

const LINK_TO_OLD_ID = 'link-to-old'

function modifyLink(oldLink) {
  if (oldLink.includes('/gallery/')) {
    const [x, postId] = oldLink.split('/gallery/')

    return `/${postId}`
  }

  return oldLink.replace('www.', 'old.')
}

if (location.host.startsWith('www.')) {
  var btnContainer = document.createElement('div')
  btnContainer.style = "position: fixed; z-index: 99999; background: black; top: 0; left: 0"
  var linkToOld = document.createElement('a')
  linkToOld.id = LINK_TO_OLD_ID
  linkToOld.href = location.href.replace('www.', 'old.')
  linkToOld.innerText = 'Switch to old.'
  btnContainer.appendChild(linkToOld)
  document.body.append(btnContainer)
}

// replace www. with old. in all links on the page
function oldifyLinks() {
  const links = document.querySelectorAll('a[href*="www.reddit"]')
  console.log('oldifyLinks: ', links)
  links.forEach(link => link.href = modifyLink(link.href))
}

if (location.host.startsWith('old.')) {
  oldifyLinks()

  setInterval(oldifyLinks, 7000)
}
