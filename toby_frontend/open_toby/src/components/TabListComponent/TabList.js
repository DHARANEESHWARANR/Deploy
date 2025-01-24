
import React, { cloneElement, useContext, useEffect, useState } from "react";
import { CollectionsContext } from "../../contexts/CollectionsContext";
import { UserContext } from "../../contexts/UsersContext";
import axios from "axios";
const MyComponent= ({activeUser,setActiveUser,onUserSelect}) => {
  const [storedData, setStoredData] = useState({});
  const {collections,setCollections} = useContext(CollectionsContext);
  // const {usersData,setUsersData} = useContext(UserContext);
  // const user_id = parseInt(localStorage.getItem('user_id'),10);
  const user_id = activeUser.user_id;
  const [dropDownResult,setDropDownReuslt] = useState({});

  useEffect(() => {
    // console.log("activeUser:",activeUser);
    // Listen for messages from content script
    const handleMessage = (event) => {
      if (event.source === window && event.data.type === "FROM_CONTENT_SCRIPT") {
        setStoredData(event.data.data);
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

  useEffect(() => {
    if (storedData && Object.keys(storedData).length > 0) {
      let Up = {};
      Object.keys(storedData).forEach((windowId) => {
            Up[windowId] = true; // Properly updating the object
      });
      setDropDownReuslt(Up);

    } 
    // else {
    //   console.log("Failure");
    // }
  }, [storedData]);

  const handleTabsDelete = async (event, tab_id, window_id) => {
    event.preventDefault();
    window.postMessage({ type: "REMOVE_UNIQUE_TAB_WITH_ID", tab_id: tab_id, window_id: window_id }, "*");
  };

  const handleDeleteAllTabs = async(event,window_id)=>{
    event.preventDefault();
    window.postMessage({type: "REMOVE_ALL_TABS_IN_THE_TABLIST_USING_WINDOW_ID", window_id: window_id},"*");
  }

    const handleClickOfSaveSession = async(event,window_id) =>{
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const formattedTitle = now.toLocaleString('en-US', options);
    const payload = {
      collection: {
        title: formattedTitle,
        description: "Description of the session",
        user_id: user_id,
        bookmarks_attributes: storedData[window_id].map((tab) => ({
          title: tab.title,
          url: tab.url,
          favicon_url: tab.favicon_url, 
        })),
      },
    };

    try{
      const response = await axios.post('http://localhost:3001/api/v1/collections', payload);
      if(response.data && response.data.collection){
        const new_collection = response.data.collection;
        setCollections((prev_collections)=>[new_collection,...prev_collections]);
        setActiveUser({
          ...activeUser,
          lastUpdated: new Date().getTime(), // Add a timestamp to force state update
        });
        window.postMessage({type: "REMOVE_OTHER_TABS"},"*");
        setTimeout(()=>{
          const tempStoreData = storedData;
          delete tempStoreData[window_id];
          setStoredData(tempStoreData); 
        },2000);
      }
    }
    catch(error){
      console.log("Error:",error);
    }
  }

  const handleDropDownOfEachWindows = async(event,window_id)=>{
      setDropDownReuslt((prevResult)=>{
        const updatedResult = {...prevResult};
        updatedResult[window_id] = !updatedResult[window_id];
        return updatedResult;
      })
  }

  const handleUpateUserNames = async(event,userData)=>{
    event.preventDefault();
    onUserSelect(userData);
    }

  return (
    <div className="w-full border shadow-lg p-4 overflow-y-auto h-screen max-h-[calc(100vh-50px)]">
      {storedData && Object.keys(storedData).length > 0 ? (
        <div>
          {Object.keys(storedData).map((windowId, index) => (
            <div key={windowId} className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700">Window {index + 1}</h2>
                {/* <span onClick={(event)=> handleDropDownOfEachWindows(event,windowId)} className="text-[20px] cursor-pointer">{
                   dropDownResult[windowId] ? <span className=""> 🔻 </span> :  <span className="text-[30px] text-pink-500 ml-2 pb-[12px]"> › </span>}</span> */}
                <button className="ml-[100px]" onClick={(event)=> handleClickOfSaveSession(event,windowId)}>⬇️</button>
                <button className="pl-[10px] text-[#b5b2aa] text-[20px]" onClick={(event)=> handleDeleteAllTabs(event,windowId)}>x</button>
     
              </div>
              <ul className="mt-2">
                {dropDownResult[windowId] && storedData[windowId].map((tab) => (
                  <li key={tab.id} className="tab-item flex border mx-6 my-3 mb-[15px] p-2 items-center rounded-lg shadow-lg hover:border-[#B7B7CE] hover:bg-[#F5F5FB] hover:translate-y-1 transition-transform relative">
                           <img src={tab.favicon_url} alt={`${tab.title} icon`} className="w-5 h-5 object-contain" />
                           <a href={tab.url} target="_blank" rel="noopener noreferrer" className="pl-2 text-[#1E1E26]">
                           {tab.title && tab.title.slice(0, 12)} 
                           {tab.title && tab.title.length > 12 && '...'} 
                           </a>
                           <button onClick={(event)=> handleTabsDelete(event,tab.id)} className="absolute top-1 right-1 group-hover:flex items-center justify-center text-gray-400 bg-transparent w-6 h-6 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center justify-center text-sm">
                             x
                           </button>
                         </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tabs available</p>
      )}
    </div>
  );
}

export default MyComponent;
