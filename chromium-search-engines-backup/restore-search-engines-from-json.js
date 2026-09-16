// go to chrome://settings/searchEngines

(async function importSEs() {
  /* `searchEngineEditStarted` takes the TemplateURL id of the engine to edit.
     Id 0 is the invalid id, which the handler reads as "add a new engine". */
  const NEW_ENGINE_ID = 0;

  /* Auxiliary function to open a file selection dialog */
  function selectFileToRead() {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.addEventListener('change', (e) => {
        resolve(e.target.files[0]);
      }, false);
      input.click();
    });
  }

  /* Auxiliary function to read data from a file */
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        resolve(e.target.result);
      });
      reader.readAsText(file);
    });
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
    const id = `${method}_restore_${++responseCounter}`;
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

  /* Keywords already taken, across defaults, site search, inactive shortcuts
     and omnibox extensions. The browser rejects duplicates silently. */
  async function takenKeywords() {
    const info = await sendWithPromise('getSearchEnginesList');
    const all = [...info.defaults, ...info.actives, ...info.others, ...info.extensions];
    return new Set(all.map(({ keyword }) => keyword));
  }

  try {
    const file = await selectFileToRead();
    const content = await readFile(file);
    const searchEngines = JSON.parse(content);

    let taken = await takenKeywords();
    const added = [];
    const skipped = [];
    const failed = [];

    for (const engine of searchEngines) {
      const { name, keyword, url } = engine;

      if (taken.has(keyword)) {
        skipped.push(engine);
        continue;
      }

      /* Actual search engine import magic */
      chrome.send('searchEngineEditStarted', [NEW_ENGINE_ID]);
      chrome.send('searchEngineEditCompleted', [name, keyword, url]);

      /* A name, keyword or url the browser refuses is dropped without any
         error, so read the list back to see what actually landed. */
      taken = await takenKeywords();
      (taken.has(keyword) ? added : failed).push(engine);
    }

    console.log(`added ${added.length}, skipped ${skipped.length} (keyword in use), failed ${failed.length}`);
    if (failed.length) {
      console.table(failed);
    }
  } finally {
    cr.webUIResponse = originalWebUiResponse;
  }
}());
