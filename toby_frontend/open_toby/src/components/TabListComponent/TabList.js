import React, { cloneElement, useContext, useEffect, useState } from "react";
import './TabList.css';
import { CollectionsContext } from "../../contexts/CollectionsContext";
import { UserContext } from "../../contexts/UsersContext";
import axios from "axios";
function MyComponent() {
  const {usersData,setUsersData} = useContext(UserContext);
  const [storedData, setStoredData] = useState([]);
  const {collections,setCollections} = useContext(CollectionsContext);
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
  const handleClickOfSaveSession = async() =>{
    console.log(storedData);
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedTitle = now.toLocaleString('en-US', options);
    const payload = {
      collection: {
        title: formattedTitle,
        description: "Description of the session",
        user_id: usersData,
        bookmarks_attributes: storedData.map((tab) => ({
          title: tab.title,
          url: tab.url,
          favicon_url: tab.favicon_url, 
        })),
      },
    };
   console.log(payload);
   setStoredData([]);
    try{
      const response = await axios.post('http://localhost:3001/api/v1/collections', payload);
      console.log("The Collection with the bulk is created");
      if(response.data && response.data.collection){
        const new_collection = response.data.collection;
        setCollections((prev_collections)=>[new_collection,...prev_collections]);
        console.log("The updated collection is :",collections);
        window.postMessage({type: "REMOVE_OTHER_TABS"},"*");
      }
    }
    catch(error){
      console.log("Error:",error);
    }
  }

  return (
    <div>
  <h1>Stored Data</h1>
  <button onClick={handleClickOfSaveSession}>Save Session</button>
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
