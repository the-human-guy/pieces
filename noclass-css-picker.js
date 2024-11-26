(function() {
    const sheets = [
      'https://www.w3.org/StyleSheets/Core/Oldstyle.css',
      'https://www.w3.org/StyleSheets/Core/Modernist.css',
      'https://www.w3.org/StyleSheets/Core/Midnight.css',
      'https://www.w3.org/StyleSheets/Core/Ultramarine.css',
      'https://www.w3.org/StyleSheets/Core/Swiss.css',
      'https://www.w3.org/StyleSheets/Core/Chocolate.css',
      'https://www.w3.org/StyleSheets/Core/Traditional.css',
      'https://www.w3.org/StyleSheets/Core/Steely.css',
      './mvp.css',
    ];

    const div = document.createElement('div');
    const head = document.querySelector('head');
    sheets.forEach(url => {
      let button = document.createElement('button');
      button.onclick = () => {
        // Remove all stylesheets
        let stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        stylesheets.forEach(el => el.parentNode.removeChild(el));

        // Insert our new sheet (<link rel="stylesheet" href="file.css">)
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);
        head.appendChild(link);
      };

      button.innerText =
        url === './mvp.css'
          ? 'Original MVP.css'
          : url.replace('https://www.w3.org/StyleSheets/Core/', '');
      button.setAttribute('style', 'cursor: pointer');
      div.appendChild(button);
      div.appendChild(document.createTextNode(' '));
    });

    // Insert buttons into DOM
    document.body.insertAdjacentElement('afterbegin', div);
  })();