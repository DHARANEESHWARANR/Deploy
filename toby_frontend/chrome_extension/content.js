
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "GET_STORAGE") {
      chrome.runtime.sendMessage("getTabs", (response) => {
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

  if(event.data.type === "Irungha Bhai"){
    console.log("Irungha Bhai is called buddy");
    chrome.runtime.sendMessage({type:"Open The Url of Official Toby Bhiceps"});
  }


});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.windowTabs) {
      chrome.storage.local.get("windowTabs", (result) => {
          window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: result.windowTabs }, "*");
      });
  }
});
