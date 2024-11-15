import React, { useEffect, useState } from "react";
import './TabList.css';
function MyComponent() {
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    // Listen for messages from content script
    const handleMessage = (event) => {
      if (event.source === window && event.data.type === "FROM_CONTENT_SCRIPT") {
        setStoredData(event.data.data);  // Update the stored data dynamically
      }
    };

    // Attach listener
    window.addEventListener("message", handleMessage);

    // Initial request to fetch storage data
    window.postMessage({ type: "GET_STORAGE" }, "*");

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div>
  <h1>Stored Data</h1>
  <ul>
    {storedData.map((tab) => (
      <li key={tab.id} className="tab-item">
        <img src={tab.favicon_url} alt={`${tab.title} icon`} />
        <a href={tab.url} target="_blank" rel="noopener noreferrer">
          {tab.title}
        </a>
      </li>
    ))}
  </ul>
</div>
  );
}

export default MyComponent;
