import React, { useEffect, useState } from "react";
import "./SearchPageComponent.css";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import { useCollectionId } from "../../contexts/CollectionIdContext";
import { useBookMarkId } from "../../contexts/BookmarkIdContext";

const SearchPageComponent = ({ activeUser, setActiveUser }) => {
  const location = useLocation();
  const {collectionId,setCollectionId} = useCollectionId();
  const {bookMarkId,setBookMarkId} = useBookMarkId();
  const user_id = location.state;
  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [searchRequestNamer, setSearchRequestNamer] = useState("all");
  const [userId, setUserId] = useState(null);
  const [userCollections, setUserCollections] = useState([]);
  const [userTabs, setUserTabs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalMatches, setTotalMatches] = useState(0);

  const handleChange = (event) => setSearchTitle(event.target.value);

  useEffect(() => {
    if (user_id) {
      setUserId(user_id.userId);
    }
  }, [user_id]);

  useEffect(() => {
    const fetchAllCollections = async () => {
      if (!userId) return;
      try {
        const response = await axios.get("http://localhost:3001/api/v1/collections", {
          params: { user_id: userId },
        });
        setUserCollections(response.data.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchAllCollections();
  }, [userId]);

  useEffect(() => {
    const fetchTabsDetails = async () => {
      if (!userCollections.length) return;

      const allTabs = [];
      for (const collection of userCollections) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/v1/collections/${collection.id}/bookmarks`
          );
          allTabs.push(...response.data.bookmarks);
        } catch (error) {
          console.error("Error fetching tabs:", error);
        }
      }
      setUserTabs(allTabs);
    };
    fetchTabsDetails();
  }, [userCollections]);

  useEffect(() => {
    const dataFiltering = () => {
      let filtered = [];
      if (searchRequestNamer === "collections") {
        filtered = userCollections.filter(
          (collection) =>
            collection?.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
            collection?.description?.toLowerCase().includes(searchTitle.toLowerCase())
        );
      } else if (searchRequestNamer === "tabs") {
        filtered = userTabs.filter((tab) =>
          tab?.title?.toLowerCase().includes(searchTitle.toLowerCase())
        );
      } else {
        const collectionsFiltered = userCollections.filter(
          (collection) =>
            collection?.title?.toLowerCase().includes(searchTitle.toLowerCase()) ||
            collection?.description?.toLowerCase().includes(searchTitle.toLowerCase())
        );

        const tabsFiltered = userTabs.filter((tab) =>
          tab?.title?.toLowerCase().includes(searchTitle.toLowerCase())
        );

        filtered = [...collectionsFiltered, ...tabsFiltered];
      }
      setFilteredData(filtered);
      setTotalMatches(filtered.length);
    };
    dataFiltering();
  }, [searchTitle, searchRequestNamer, userTabs, userCollections]);

  const handleRequestNamerClick = (type) => {
    const types = { Collection: "collections", Bookmarks: "tabs", All: "all" };
    setSearchRequestNamer(types[type] || "all");
  };

  const handleSelectionClick = async(event,item)=>{
      event.preventDefault();
      console.log(item);
      if(item.user_id && item.id){
      setCollectionId(item.id);
      navigate('/user_profile', { state: { activeUserId: user_id } });
      }
      else if(item.collection_id){
        console.log("The Collection Id is:",item.collection_id);
        setBookMarkId(item.id);
        setCollectionId(item.collection_id);
        navigate('/user_profile', { state: { activeUserId: user_id } }); 
      }
  }
  const handleGoBack = async() =>{
           navigate(-1);
  }

  return (
    <div className="search-page bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 min-h-screen p-8 animate-fadeIn">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 animate-fadeIn">
        Search Your Collections & Tabs
      </h1>
      <p className="text-center text-gray-600 mb-6 animate-fadeIn">
        Find collections and tabs effortlessly. Filter by collections, tabs, or search everything!
      </p>
      <div className="search-container flex flex-col items-center gap-4">
        <input
          type="text"
          className="search-input w-full p-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transform hover:scale-105 transition-all duration-300"
          placeholder="Type here to search..."
          value={searchTitle}
          onChange={handleChange}
        />
        <div className="button-group flex gap-3">
          {["All", "Collection", "Bookmarks"].map((type) => (
            <button
              key={type}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                searchRequestNamer === type.toLowerCase()
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transform hover:scale-105 transition-all duration-300`}
              onClick={() => handleRequestNamerClick(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className="results-container mt-8 max-h-96 overflow-y-auto">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={index.id}
              className="result-item bg-gray-50 shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-transform transform hover:scale-105 animate-fadeIn"
              onClick={(event)=>handleSelectionClick(event,item)}
            >
              <h2 className="text-gray-900 font-semibold text-lg">{item.title || "Untitled"}</h2>
              {item.description && (
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="no-results text-pink-500 text-center text-lg font-medium animate-fadeIn">
            No matches found. Try a different search term!
          </p>
        )}
        <p className="total-matches text-center text-pink-600 font-semibold mt-4 animate-fadeIn">
          Total Matches: {totalMatches}
        </p>
      </div>
    </div>
    <div className="sign-out-container fixed bottom-6 right-6">
        <button
          onClick={(event)=> handleGoBack(event)}
          className="bg-black-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-black-600 transition-all duration-300 transform hover:scale-105"
        >
          Go Back
        </button>
      </div>
  </div>
  
  );
};

export default SearchPageComponent;
