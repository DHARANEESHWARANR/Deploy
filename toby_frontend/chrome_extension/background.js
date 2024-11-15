// Function to collect and store details of all tabs except the specified one
function collectAndStoreTabs(excludeTabId = null) {
  chrome.tabs.query({}, (tabs) => {
    console.log(tabs);
      const tabInfo = tabs
          .filter((tab) => tab.id !== excludeTabId  && tab.title !== "React App" && tab.title !== "Extensions" && tab.title !=="New Tab")  // Exclude specified tab
          .map((tab) => ({
              id: tab.id,
              url: tab.url || null,  // Fallback to null if undefined
              title: tab.title || null,
              favicon_url: tab.favIconUrl || null              
          }));

      // Store the tab details in Chrome local storage
      chrome.storage.local.set({ openTabs: tabInfo }, () => {
          if (chrome.runtime.lastError) {
              console.error("Error saving tab details:", chrome.runtime.lastError);
          } else {
              console.log("Tab details successfully saved:", tabInfo);
          }
      });
  });
}

// Retry fetching tab information to capture missing titles or URLs
function refreshTabDetails() {
  chrome.tabs.query({}, (tabs) => {
      chrome.storage.local.get("openTabs", (data) => {
          const openTabs = data.openTabs || [];

          const updatedTabs = tabs
          .filter((tab) => tab.title !== "Extensions" && tab.title !== "React App" && tab.title!=="New Tab")  // Filtering unwanted tabs first
          .map((tab) => {
            const existingTab = openTabs.find((t) => t.id === tab.id);
            return {
              id: tab.id,
              url: tab.url || (existingTab ? existingTab.url : null),
              title: tab.title || (existingTab ? existingTab.title : null),
              favicon_url: tab.favIconUrl || (existingTab ? existingTab.favicon_url : null),
            };
          });

          chrome.storage.local.set({ openTabs: updatedTabs }, () => {
              if (chrome.runtime.lastError) {
                  console.error("Error refreshing tab details:", chrome.runtime.lastError);
              } else {
                  console.log("Refreshed tab details:", updatedTabs);
              }
          });
      });
  });
}

// Initial storage of all open tabs when extension loads
chrome.runtime.onInstalled.addListener(() => {
  collectAndStoreTabs();
  // Retry fetching tab details after a short delay
  setTimeout(refreshTabDetails, 1000);  // Adjust delay if needed
});

// Listen for new tab creation and update storage
chrome.tabs.onCreated.addListener((tab) => {
  collectAndStoreTabs(tab.id);  // Store all tabs except the new one
});

// Listen for tab removal and update storage
chrome.tabs.onRemoved.addListener((removedTabId) => {
  // Retrieve the current list of stored tabs
  chrome.storage.local.get("openTabs", (data) => {
      const openTabs = data.openTabs || [];

      // Filter out the removed tab
      const updatedTabInfo = openTabs.filter((tab) => tab.id !== removedTabId);

      // Update the local storage with the new list of tabs
      chrome.storage.local.set({ openTabs: updatedTabInfo }, () => {
          if (chrome.runtime.lastError) {
              console.error("Error updating tab details on removal:", chrome.runtime.lastError);
          } else {
              console.log("Tab details successfully updated after removal:", updatedTabInfo);
          }
      });
  });
});

// Listen for tab updates to get url and title when available
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.title) {
      refreshTabDetails();
  }
});

// Message listener for content script requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("List-----------------------------------");
  if (message === "getTabs") {
      // Access data from chrome.storage.local
      chrome.storage.local.get("openTabs", (data) => {
          // Send response back to content script
          sendResponse({ tabs: data.openTabs });
      });
      return true;  // Keeps the message channel open for asynchronous response
  }
});
