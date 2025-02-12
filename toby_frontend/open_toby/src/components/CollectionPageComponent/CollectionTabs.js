import axios from 'axios';
import React, { useEffect, useState } from 'react';
import img1 from '../../assets/edit.png';
import { useBookMarkId } from "../../contexts/BookmarkIdContext";
// Main CollectionTabs component
const CollectionTabs = ({ collection_id }) => {
  const serverHost = process.env.REACT_APP_SERVER_HOST;
  const [allTabs, setAllTabs] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if the modal is open
  const [currentTab, setCurrentTab] = useState(null); // Store the current tab being edited
  const [editedTitle, setEditedTitle] = useState('');
  const {bookMarkId,setBookMarkId} = useBookMarkId();
  const [editedUrl, setEditedUrl] = useState('');

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const tabs_response = await axios.get(`http://${process.env.REACT_APP_SERVER_HOST}:3001/api/v1/collections/${collection_id}/bookmarks`);
        setAllTabs(tabs_response.data.bookmarks);
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (collection_id) fetchTabs();
  }, [collection_id]);

  // useEffect(()=>{
  //   console.log("The Book MArk Id is:",bookMarkId);
  //   console.log(allTabs);
  // },[bookMarkId])

  // useEffect(()=>{
  //    console.log("The tabs are:",allTabs);
  // },[allTabs])
  const handleTabsDeletion = async (bookmark_id) => {
    try {
      const response = await axios.delete(`http://${process.env.REACT_APP_SERVER_HOST}:3001/api/v1/collections/${collection_id}/bookmarks/${bookmark_id}`);
      const updated_tabs = allTabs.filter((tab) => tab.id !== bookmark_id);
      setAllTabs(updated_tabs);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Open the edit modal and populate with the current tab's details
  const handleEditClick = (tab) => {
    setCurrentTab(tab);
    setEditedTitle(tab.title);
    setEditedUrl(tab.url);
    setIsEditing(true);
  };

  // Close the edit modal without saving
  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTab(null);
  };

  // Save changes after editing
  const handleSaveChanges = async () => {
    try {
      const updatedTab = { ...currentTab, title: editedTitle, url: editedUrl };
      await axios.put(`http://${process.env.REACT_APP_SERVER_HOST}:3001/api/v1/collections/${collection_id}/bookmarks/${currentTab.id}`, updatedTab);
      
      const updatedTabs = allTabs.map((tab) => 
        tab.id === currentTab.id ? { ...tab, title: editedTitle, url: editedUrl } : tab
      );
      setAllTabs(updatedTabs);
      setIsEditing(false); // Close the modal
    } catch (error) {
      console.log("Error saving changes:", error);
    }
  };

  return (
    <div className="collection-tabs-container p-4 pl-10 pr-16 pb-10 border-b">
      {/* Main content with the tabs */}
      <ul className="collection-tabs grid grid-cols-3 gap-3 justify">
        {allTabs.map((tab) => (
         <li
         key={tab.id}
         className={`tab-item group shadow-md rounded-lg flex flex-col items-center space-y-2 hover:border-[#B7B7CE] hover:translate-y-1 transition-transform w-[250px] h-[105px] bg-[#ffffff] relative 
         ${
           tab.id === bookMarkId
             ? 'border-2 border-pink-500 shadow-xl scale-110 transition-all duration-300 ease-out ring-2 ring-pink-400 ring-opacity-50'
             : 'transition-all duration-200 ease-in'
         }`}
       >
       
          <div className="flex">
            <img src={tab.favicon_url} alt={`${tab.title} icon`} className="w-6 h-6 mb-2" />
            <a
              href={tab.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 font-semibold text-center pb-2 pl-4"
            >
              {tab.title && tab.title.slice(0, 12)}
              {tab.title && tab.title.length > 12 && '...'}
            </a>
          </div>
          <div className="w-full">
            <h1 className="text-sm font-medium text-gray-400 border-t border-gray-300 pt-1">
              {tab.title && tab.title.slice(0, 10)}
              {tab.title && tab.title.length > 10 && '...'}
            </h1>
          </div>
          <button
            className="absolute bottom-3 right-1 text-gray-600 hidden group-hover:flex items-center text-gray-400"
            onClick={() => handleEditClick(tab)}
          >
            <img src={img1} alt="Edit" className="w-4 h-4 object-contain" />
          </button>
          <button
            className="absolute bottom-20 right-1 text-gray-400 hidden group-hover:flex items-center justify-center text-gray-400 bg-transparent w-6 h-6 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-200 text-sm"
            onClick={() => handleTabsDeletion(tab.id)}
          >
            x
          </button>
        </li>        
        ))}
      </ul>

      {/* Modal for editing */}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Tab</h2>
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">URL</label>
              <input
                type="text"
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2"
              />
            </div>
            <div className="flex mt-6 space-x-4">
              <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Save Changes</button>
              <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionTabs;
