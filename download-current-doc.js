function downloadCurrentDocument() {
  var base64doc = btoa(unescape(encodeURIComponent(document.documentElement.outerHTML))),
      a = document.createElement('a'),
      e = new MouseEvent('click');

  a.download = 'doc.html';
  a.href = 'data:text/html;base64,' + base64doc;
  a.dispatchEvent(e);
}
    
downloadCurrentDocument();


/*

// bookmarklet
javascript:(function()%7Bfunction%20downloadCurrentDocument()%20%7B%0A%20%20var%20base64doc%20%3D%20btoa(unescape(encodeURIComponent(document.documentElement.outerHTML)))%2C%0A%20%20%20%20%20%20a%20%3D%20document.createElement('a')%2C%0A%20%20%20%20%20%20e%20%3D%20new%20MouseEvent('click')%3B%0A%0A%20%20a.download%20%3D%20'doc.html'%3B%0A%20%20a.href%20%3D%20'data%3Atext%2Fhtml%3Bbase64%2C'%20%2B%20base64doc%3B%0A%20%20a.dispatchEvent(e)%3B%0A%7D%0A%20%20%20%20%0AdownloadCurrentDocument()%3B%7D)()%3B

// html a link
<a href="javascript:(function()%7Bfunction%20downloadCurrentDocument()%20%7B%0A%20%20var%20base64doc%20%3D%20btoa(unescape(encodeURIComponent(document.documentElement.outerHTML)))%2C%0A%20%20%20%20%20%20a%20%3D%20document.createElement('a')%2C%0A%20%20%20%20%20%20e%20%3D%20new%20MouseEvent('click')%3B%0A%0A%20%20a.download%20%3D%20'doc.html'%3B%0A%20%20a.href%20%3D%20'data%3Atext%2Fhtml%3Bbase64%2C'%20%2B%20base64doc%3B%0A%20%20a.dispatchEvent(e)%3B%0A%7D%0A%20%20%20%20%0AdownloadCurrentDocument()%3B%7D)()%3B">bookmarklet</a>

*/

