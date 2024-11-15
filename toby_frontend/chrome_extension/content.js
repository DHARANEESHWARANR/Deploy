// content.js

window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "GET_STORAGE") {
      chrome.runtime.sendMessage("getTabs", (response) => {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: response.tabs }, "*");
      });
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
