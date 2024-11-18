import React, { cloneElement, useContext, useEffect, useState } from "react";
import './TabList.css';
import { CollectionsContext } from "../../contexts/CollectionsContext";
import { UserContext } from "../../contexts/UsersContext";
import axios from "axios";
function MyComponent() {
  const {usersData,setUsersData} = useContext(UserContext);
  const user_id = parseInt(localStorage.getItem('user_id'),10);
  const [storedData, setStoredData] = useState([]);
  const {collections,setCollections} = useContext(CollectionsContext);
  useEffect(() => {
    // Listen for messages from content script
    const handleMessage = (event) => {
      if (event.source === window && event.data.type === "FROM_CONTENT_SCRIPT") {
        setStoredData(event.data.data);  // Update the stored data dynamically
      }
    };

    window.addEventListener("message", handleMessage);
    window.postMessage({ type: "GET_STORAGE" }, "*");


    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  const handleClickOfSaveSession = async() =>{
    console.log(user_id);
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedTitle = now.toLocaleString('en-US', options);
    const payload = {
      collection: {
        title: formattedTitle,
        description: "Description of the session",
        user_id: user_id,
        bookmarks_attributes: storedData.map((tab) => ({
          title: tab.title,
          url: tab.url,
          favicon_url: tab.favicon_url, 
        })),
      },
    };
   console.log(payload);
    try{
      const response = await axios.post('http://localhost:3001/api/v1/collections', payload);
      console.log("The Collection with the bulk is created");
      if(response.data && response.data.collection){
        const new_collection = response.data.collection;
        setCollections((prev_collections)=>[new_collection,...prev_collections]);
        console.log("The updated collection is :",collections);
        window.postMessage({type: "REMOVE_OTHER_TABS"},"*");
        setTimeout(()=>{
          setStoredData([]);
          console.log("The store data is now emty");
        },2000);
      }
    }
    catch(error){
      console.log("Error:",error);
    }
  }

  return (
    <div>
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
