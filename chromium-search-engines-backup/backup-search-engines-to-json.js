// go to chrome://settings/searchEngines

(async function exportSEs() {
  /* Auxiliary function to download a file with the exported data */
  function downloadData(filename, data) {
    const file = new File([data], { type: 'text/json' });
    const elem = document.createElement('a');
    elem.href = URL.createObjectURL(file);
    elem.download = filename;
    elem.click();
  }

  if (!window.chrome || !chrome.send || !window.cr || !cr.webUIResponse) {
    throw new Error('Run this from the devtools console on chrome://settings/searchEngines');
  }

  /* chrome.send for messages that answer back. C++ replies by calling
     cr.webUIResponse(id, ...), so responses to our own ids are picked off here
     and everything else is handed to the settings page's own handler. */
  const pending = new Map();
  const originalWebUiResponse = cr.webUIResponse;
  let responseCounter = 0;

  cr.webUIResponse = (id, isSuccess, response) => {
    const resolver = pending.get(id);
    if (!resolver) {
      return originalWebUiResponse(id, isSuccess, response);
    }
    pending.delete(id);
    (isSuccess ? resolver.resolve : resolver.reject)(response);
  };

  function sendWithPromise(method, ...args) {
    const id = `${method}_backup_${++responseCounter}`;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (pending.delete(id)) {
          reject(new Error(`${method} did not respond`));
        }
      }, 5000);
      chrome.send(method, [id, ...args]);
    });
  }

  try {
    /* `actives` is the "Site search" list. `defaults` and `others` hold the
       built-in engines and the inactive shortcuts the browser adds on its own. */
    const info = await sendWithPromise('getSearchEnginesList');
    const searchEngines = info.actives.map(({ name, keyword, url }) => ({ name, keyword, url }));

    downloadData('search_engines.json', JSON.stringify(searchEngines, null, 2));
  } finally {
    cr.webUIResponse = originalWebUiResponse;
  }
}());
