const searchMode = {LOAD: 'load', QUEUE: 'queue'}

const loadSearchOption = document.getElementById('load-search');
const queueSearchOption = document.getElementById('queue-search');
const dataApiCheckbox = document.getElementById('data-api-checkbox');
const dataApiClientID = document.getElementById('data-api-clientid');
const dataApiKey = document.getElementById('data-api-key');

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

const displayAPIfields = function(cond) {
  if(cond) {
    dataApiClientID.style.removeProperty('display');
    dataApiKey.style.removeProperty('display');
  } else {
    dataApiClientID.style.display = 'none';
    dataApiKey.style.display = 'none';
  }
}

initialize();
function initialize() {
  browser.storage.local.get('options').then((res) => {
    if(res.options.searchMode == searchMode.LOAD) {
      loadSearchOption.checked = true;
    } else {
      queueSearchOption.checked = true;
    }
    displayAPIfields(res.options.enableDataAPI);
    dataApiCheckbox.checked = res.options.enableDataAPI;
    if(res.options.enableDataAPI) {
      dataApiClientID.value = res.options.dataApiClientID;
      dataApiKey.value = res.options.dataApiKey;
    }
  })
}

loadSearchOption.onclick =  function() {
  updateOptions({searchMode: searchMode.LOAD})
}

queueSearchOption.onclick =  function() {
  updateOptions({searchMode: searchMode.QUEUE})
}

dataApiCheckbox.onclick = function(e) {
  updateOptions({enableDataAPI: e.target.checked})
}

dataApiClientID.onkeydown = function(e) {
  updateOptions({dataApiClientID: e.target.value})
}

dataApiKey.onkeydown = function(e) {
  updateOptions({dataApiKey: e.target.value})
}

browser.storage.onChanged.addListener(function(changes, areaName) {
  if(areaName == 'local') {
    if(changes.options){
      displayAPIfields(changes.options.newValue.enableDataAPI);
      console.log('Options changed:', changes.options.newValue);
    }
  }
})
