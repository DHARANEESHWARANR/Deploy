
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "GET_STORAGE") {
      chrome.runtime.sendMessage("getTabs", (response) => {
        console.log("The response Came Buddy2:")
        console.log(response.windowsAndTabsData);
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: response.windowsAndTabsData }, "*");
      });
  }
  if(event.data.type === "REMOVE_UNIQUE_TAB_WITH_ID"){
    chrome.runtime.sendMessage({
      type: "Remove",
      tab_id: event.data.tab_id,
      window_id: event.data.window_id
    })
  }

  if(event.data.type === "OPEN_ALL_TABS"){
    chrome.runtime.sendMessage({
      type: "open_all_tabs",
      urls: event.data.urls,
    })
  }

  if (event.data.type === "REMOVE_OTHER_TABS") {
    chrome.runtime.sendMessage("remove_tabs_except_current_one");
  }

  if(event.data.type === "REMOVE_ALL_TABS_IN_THE_TABLIST_USING_WINDOW_ID"){
    chrome.runtime.sendMessage({type:"REMOVE_ALL_TABS_IN_THE_TABLIST_USING_WINDOW_ID",window_id: event.data.window_id});
  }


});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.windowTabs) {
      console.log("Detected change in windowTabs storage:", changes.windowTabs.newValue);
      
      chrome.storage.local.get("windowTabs", (result) => {
          console.log("Message Sending updated openTabs data to React app:", result.windowTabs);
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: result.windowTabs }, "*");
          console.log("Sent updated openTabs data to React app:", result.windowTabs);
      });
  }
});
