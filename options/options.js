const searchMode = {LOAD: 'load', QUEUE: 'queue'}

const loadSearchOption = document.getElementById('load-search');
const queueSearchOption = document.getElementById('queue-search');

const updateOptions = function(payload) {
  browser.storage.local.get('options').then((res) => {
    browser.storage.local.set({
      options: {
        ...res.options,
        ...payload
      }
    })
  })
}

initialize();
function initialize() {
  browser.storage.local.get('options').then((res) => {
    if(res.options.searchMode == searchMode.LOAD) {
      loadSearchOption.checked = true;
    } else {
      queueSearchOption.checked = true;
    }
  })
}

loadSearchOption.onclick =  function() {
  updateOptions({searchMode: searchMode.LOAD})
}

queueSearchOption.onclick =  function() {
  updateOptions({searchMode: searchMode.QUEUE})
}
