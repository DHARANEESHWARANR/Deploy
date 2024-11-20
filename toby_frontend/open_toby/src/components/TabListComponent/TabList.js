import React, { cloneElement, useContext, useEffect, useState } from "react";
// import './TabList.css';
import { CollectionsContext } from "../../contexts/CollectionsContext";
import { UserContext } from "../../contexts/UsersContext";
import axios from "axios";
import { useViewTransitionState } from "react-router-dom";
function MyComponent() {
  const {usersData,setUsersData} = useContext(UserContext);
  const user_id = parseInt(localStorage.getItem('user_id'),10);
  const [storedData, setStoredData] = useState([]);
  const {collections,setCollections} = useContext(CollectionsContext);
  const [visible,setVisible] = useState(true);

  useEffect(() => {
    // Listen for messages from content script
    const handleMessage = (event) => {
      if (event.source === window && event.data.type === "FROM_CONTENT_SCRIPT") {
        setStoredData(event.data.data);
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
  const handleWindowDropDown = () =>{
    setVisible(!visible);
  }

  const handleTabsDelete = async(event,tab_id) =>{
    event.preventDefault();
      console.log(tab_id)
      window.postMessage({type: "REMOVE_UNIQUE_TAB_WITH_ID",id: tab_id},"*");
  }
  return (
    <div className="border w-[100%] shadow-lg">
  <div className="flex mt-[15px] items-center ">
     <h1 className="text-md text-[#474759] pl-[15px]">window1</h1>
     <span onClick={handleWindowDropDown} className="text-[20px] cursor-pointer">{
      !visible ? <span className=""> 🔻 </span> :  <span className="text-[30px] text-pink-500 ml-2 pb-[12px]"> › </span>
      }</span>
     <button className="ml-[100px]" onClick={handleClickOfSaveSession}>⬇️</button>
     <button className="pl-[10px] text-[#b5b2aa] text-[20px]">x</button>
  </div>

  {
    visible && <ul className="">
    {storedData && storedData.map((tab) => (
      <li key={tab.id} className="tab-item flex border mx-6 my-3 mb-[15px] p-2 items-center rounded-lg shadow-lg hover:border-[#B7B7CE] hover:bg-[#F5F5FB] hover:translate-y-1 transition-transform">
        <img src={tab.favicon_url} alt={`${tab.title} icon`} className="w-5 h-5 object-contain" />
        <a href={tab.url} target="_blank" rel="noopener noreferrer" className="pl-2 text-[#1E1E26]">
        {tab.title && tab.title.slice(0, 12)} {/* Truncate to the first 10 characters */}
        {tab.title && tab.title.length > 12 && '...'} {/* Add ellipsis if title exceeds 10 characters */}
        </a>
        <button onClick={(event)=> handleTabsDelete(event,tab.id)} className="absolute top-1 right-1 group-hover:flex items-center justify-center text-gray-400 bg-transparent w-6 h-6 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center justify-center text-sm">
           x
        </button>
      </li>
    ))}
    </ul>
  }
   </div>
  );
}

export default MyComponent;
