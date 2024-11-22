
// Listen for messages from the webpage
window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  // Handle storage-related messages
  if (event.data.type === "GET_STORAGE") {
    chrome.runtime.sendMessage("getTabs", (response) => {
      window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: response.tabs }, "*");
    });
  }

  // Handle requests to remove other tabs except the current one
  if (event.data.type === "REMOVE_OTHER_TABS") {
    chrome.runtime.sendMessage("remove_tabs_except_current_one");
  }

  // Handle requests to remove a unique tab by ID
  if (event.data.type === "REMOVE_UNIQUE_TAB_WITH_ID") {
    console.log("Message received to delete a unique tab with ID");
    chrome.runtime.sendMessage({
      type: "REMOVE_TAB",
      id: event.data.id,
    });
  }

  // Handle requests to remove multiple tabs by ID
  if (event.data.type === "REMOVE_ALL_TABS_WITH_ID") {
    console.log("Message received to delete all tabs with IDs:", event.data.all_url_id);
    chrome.runtime.sendMessage({
      type: "REMOVE_ALL_TABS_WITH_ID",
      urls: event.data.all_url_id,
    });
  }

  // Handle requests to open multiple tabs with URLs
  if (event.data.type === "OPEN_ALL_TABS") {
    console.log("Message received to open multiple tabs with URLs");
    chrome.runtime.sendMessage({
      action: "OPEN_ALL_TABS",
      urls: event.data.urls,
    });
  }
});

// Listen for changes in the local storage
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.openTabs) {
    console.log("Detected change in openTabs storage:", changes.openTabs.newValue);
    chrome.storage.local.get("openTabs", (result) => {
      window.postMessage({ type: "FROM_CONTENT_SCRIPT", data: result.openTabs }, "*");
      console.log("Sent updated openTabs data to the React app:", result.openTabs);
    });
  }
});
