
// Function to collect and store tabs grouped by window
function collectAndStoreTabsByWindow(excludeTabId = null) {
  chrome.tabs.query({}, (tabs) => {
      const tabsByWindow = {};
      tabs.forEach((tab) => {
          if (tab.id !== excludeTabId && tab.title !== "React App" && tab.title !== "Extensions") {
              if (!tabsByWindow[tab.windowId]) {
                  tabsByWindow[tab.windowId] = [];
              }
              tabsByWindow[tab.windowId].push({
                  id: tab.id,
                  url: tab.url || null, 
                  title: tab.title || null,
                  favicon_url: tab. favIconUrl || null
              });
          }
      });

      chrome.storage.local.set({ windowTabs: tabsByWindow }, () => {
          if (chrome.runtime.lastError) {
              console.error("Error saving window-tab details:", chrome.runtime.lastError);
          } else {
              console.log("Window-tab details successfully saved:", tabsByWindow);
          }
      });
  });
}

function refreshTabDetailsByWindow(){
  chrome.tabs.query({},(tabs)=>{
       chrome.storage.local.get("windowTabs",(data)=>{
           const existingCollection = data.windowTabs || [];
           const updatedWindowCollection = {};
           tabs.forEach((tab)=>{
              if(!updatedWindowCollection[tab.windowId]){
                   updatedWindowCollection[tab.windowId] = [];
              }
              const existingTab = existingCollection[tab.windowId].find((t)=> t.id === tab.id);
              if(tab.title !== "React App" && tab.title !== "Extensions"){
              updatedWindowCollection[tab.windowId].push({
                  id: tab.id,
                  url: tab.url || (existingTab ? existingTab.url : null),
                  title: tab.title || (existingTab ? existingTab.title : null),
                  favicon_url: tab. favIconUrl || (existingTab ? existingTab.favicon_url : null)
              });
            }
           });

           chrome.storage.local.set({ windowTabs: updatedWindowCollection }, () => {
              if (chrome.runtime.lastError) {
                  console.error("Error refreshing window-tab details:", chrome.runtime.lastError);
              } else {
                  console.log("Refreshed window-tab details:", updatedWindowCollection);
              }
          });
      })
  })
}


chrome.tabs.onRemoved.addListener((removedTabId)=>{
  collectAndStoreTabsByWindow();

})

chrome.runtime.onInstalled.addListener(() => {
  collectAndStoreTabsByWindow();
  setTimeout(refreshTabDetailsByWindow, 1000); 
});

chrome.tabs.onCreated.addListener((tab)=>{
  collectAndStoreTabsByWindow(tab.id);
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.title) {
      refreshTabDetailsByWindow();
  }
})


chrome.windows.onCreated.addListener((window) => {
  // Optionally call a function to collect and store tabs after window is created
  collectAndStoreTabsByWindow();
});


//listen for the messages from the content.js
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
  // Handle "getTabs" request
if (message === "getTabs") {
  chrome.storage.local.get("windowTabs", (data) => {
    sendResponse({ windowsAndTabsData: data.windowTabs });
  });
  return true; // Keeps the response channel open for async response
}

if(message.type === "Remove"){
  chrome.tabs.remove(message.tab_id, () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to remove tab:", chrome.runtime.lastError.message);
      } else {
        console.log(`Tab with ID ${tabId} successfully removed.`);
      }
    });

  }

  if(message.type === "open_all_tabs"){
     message.urls.forEach((url)=>{
      chrome.tabs.create({url});
     })
  }

  if (message === "remove_tabs_except_current_one") {
    chrome.tabs.query({}, (tabs) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        const activeTabId = activeTabs[0]?.id;
        tabs.forEach((tab) => {
          if (tab.id !== activeTabId) {
            chrome.tabs.remove(tab.id);
          }
        });
      });
    });
  }

  if(message.type === "REMOVE_ALL_TABS_IN_THE_TABLIST_USING_WINDOW_ID"){
    chrome.storage.local.get("windowTabs",(data)=>{
      var updatedWindowInformation = data.windowTabs;
      if(updatedWindowInformation[message.window_id]){
        updatedWindowInformation[message.window_id].map((tab)=>{
          chrome.tabs.remove(tab.id);
        })
        delete updatedWindowInformation[message.window_id];
        chrome.storage.local.set({ windowTabs: updatedWindowInformation }, () => {
          if (chrome.runtime.lastError) {
              console.error("Error refreshing window-tab details:", chrome.runtime.lastError);
          } else {
              console.log("Refreshed window-tab details:", updatedWindowCollection);
          }
      });
      }
      else{
        console.log("Failure");
      }
    })
  }


})