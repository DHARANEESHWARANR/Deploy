// content.js

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "GET_STORAGE") {
      chrome.runtime.sendMessage("getTabs", (response) => {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: response.tabs }, "*");
      });
  }
});

window.addEventListener("message",(event)=>{
  if(event.source!==window) return;
  if(event.source === window && event.data.type =="REMOVE_OTHER_TABS"){
    chrome.runtime.sendMessage("remove_tabs_except_current_one");
  }
})

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data.type === "OPEN_ALL_TABS") {
    chrome.runtime.sendMessage({ action: "OPEN_ALL_TABS", urls: event.data.urls });
  }
});




chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.openTabs) {
      console.log("Detected change in openTabs storage:", changes.openTabs.newValue);
      
      chrome.storage.local.get("openTabs", (result) => {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: result.openTabs }, "*");
          console.log("Sent updated openTabs data to React app:", result.openTabs);
      });
  }
});
