// popup.js

// Add event listener to open the React app in a new tab when the button is clicked
document.getElementById("openApp").addEventListener("click", () => {
  console.log("dd");
  chrome.tabs.create({ url: "http://localhost:3002" });
});
