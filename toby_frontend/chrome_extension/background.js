// Function to collect and store details of all tabs except the specified one
function collectAndStoreTabs(excludeTabId = null) {
  chrome.tabs.query({}, (tabs) => {
    console.log(tabs);
      const tabInfo = tabs
          .filter((tab) => tab.id !== excludeTabId  && tab.title !== "React App" && tab.title !== "Extensions" && tab.title !=="New Tab")  // Exclude specified tab
          .map((tab) => ({
              id: tab.id,
              url: tab.url || null, 
              title: tab.title || null,
              favicon_url: tab.favIconUrl || null              
          }));
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
  
  setTimeout(refreshTabDetails, 1000);  
});

// Listen for new tab creation and update storage
chrome.tabs.onCreated.addListener((tab) => {
  collectAndStoreTabs(tab.id);  
});

// Listen for tab removal and update storage
chrome.tabs.onRemoved.addListener((removedTabId) => {
  
  chrome.storage.local.get("openTabs", (data) => {
      const openTabs = data.openTabs || [];
      const updatedTabInfo = openTabs.filter((tab) => tab.id !== removedTabId);
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
      chrome.storage.local.get("openTabs", (data) => {
          sendResponse({ tabs: data.openTabs });
      });
      return true; 
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message === "remove_tabs_except_current_one") {
    console.log("Hello bhaiya");
    chrome.tabs.query({}, (tabs) => {
      console.log(tabs);
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        console.log(activeTabs)
        const activeTabId = activeTabs[0].id;
        tabs.forEach((tab) => {
          if (tab.id !== activeTabId) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Received message:", message);
  
  if (message.action === "OPEN_ALL_TABS" && Array.isArray(message.urls)) {
    console.log("Opening all tabs with URLs:", message.urls);
  
    message.urls.forEach((url) => {
      if (url) {
        chrome.tabs.create({ url });
      }
    });
    
    sendResponse({ status: "success", message: "Tabs opened successfully." });
  }
});

