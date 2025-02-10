import React, { startTransition, useEffect, useState } from "react"; 
import axios from "axios";
import CollectionTabs from "../CollectionPageComponent/CollectionTabs";
import img1 from '../../assets/edit.png';
const StaredCollections = ({activeUser}) =>{
    const [StaredCollection,setStaredCollection] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [visible, setVisible] = useState({});
    const [clicked,setClicked] = useState(0);
useEffect(()=>{
    const fetchCollections = async() =>{
           try{
               const collection_response = await axios.get("http://localhost:3001/api/v1/collections",{
                params:{
                    user_id: activeUser.user_id
                }
               })
               console.log(collection_response);
               const stared_collection_from_response = collection_response.data.collections.filter((collection) => collection.stared == 1);
               console.log(stared_collection_from_response);
               setStaredCollection(stared_collection_from_response);
           }
           catch(error){
              console.log("Error",error);
           }
    };
    if (activeUser.user_id) fetchCollections();
},[activeUser]);

useEffect(()=>{
  console.log("The Stared Collections Are:",StaredCollection);
    const initialVisibility = StaredCollection.reduce((acc, collection) => {
      acc[collection.id] = true;
      return acc;
    }, {});
    setVisible(initialVisibility);
},[StaredCollection])

const handleEditChange = (event) => {
    setEditTitle(event.target.value);
  };


  const handleEditSubmit = async (event, collection_id) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/collections/${collection_id}`,
        {
          collection: {
            title: editTitle,
          },
        }
      );

      const updatedCollection = response.data.collection;
      setStaredCollection((prevCollections) => {
        const updatedCollections = prevCollections.map((collection) =>
          collection.id === collection_id ? updatedCollection : collection
        );
        return updatedCollections;
      });

      setEditId(null);
    } catch (error) {
      console.error("Error updating collection:", error);
    }
  };
  const handleVisibilityToggle = (collection_id) => {
    setVisible((prevVisibility) => ({
      ...prevVisibility,
      [collection_id]: !prevVisibility[collection_id], // Toggle visibility for the specific collection
    }));
  };
  const handleEditCancel = () => {
    setEditId(null);
  };

  const handleGetAllTabs = async (collection_id, message) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/collections/${collection_id}/bookmarks`
      );
      const urls = [];
      response.data.bookmarks.map((tabs) => {
        urls.push(tabs.url);
      });

      if (message === "OPEN AND CLOSE") {
        window.postMessage({ type: "REMOVE_OTHER_TABS" }, "*");
        setTimeout(() => {
          window.postMessage({ type: "OPEN_ALL_TABS", urls: urls }, "*");
        }, 200);
      }

      if (message === "OPEN ALL TABS") {
        window.postMessage({ type: "OPEN_ALL_TABS", urls: urls }, "*");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handleDelete = async (collection_id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/collections/${collection_id}`
      );
      setStaredCollection((prevCollections) =>
        prevCollections.filter((collection) => collection.id !== collection_id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditClick = (collection) => {
    setEditId(collection.id);
    setEditTitle(collection.title);
  };


    return(
        <div>
            {StaredCollection && StaredCollection.length == 0? 
            <div className="pt-24 text-center text-gray-400 border-t-2 border-gray-1000">
              <div className="text-[50px]">
              You have not starred any collections yet
              </div>
              <div className="pt-12 text-[25px]">
              Click "star" in the collection menu to get started
              </div>
            </div>:
            <div className="overflow-y-auto h-screen max-h-[calc(100vh-100px)] border-t-2 border-gray-1000">
            {StaredCollection.map((collection) => (
                  <li key={collection.id} className="list-none collection-item snap-y">
                    {editId === collection.id ? (
                      <div className="tailwind">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={handleEditChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                          onClick={(event) =>
                            handleEditSubmit(event, collection.id)
                          }
                          className="px-3 py-1 font-semibold text-gray-500 transition duration-200 border border-gray-300 rounded-md hover:text-gray-700 hover:bg-gray-100"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-4 py-1 font-semibold text-white transition duration-200 bg-pink-500 rounded-md hover:bg-pink-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex h-[60px] items-center justify w-full pr-28">
                        <h3 className="collection-item-h3 text-gray-500 pl-8 text-[25px] ">
                          <b>{collection.title}</b>
                          <span
                            onClick={() => handleVisibilityToggle(collection.id)}
                            className="text-[20px] cursor-pointer"
                          >
                            {visible[collection.id] ? (
                              <span className="text-[30px] text-pink-500 ml-2 pb-[12px]">
                                ›
                              </span>
                            ) : (
                              <span>🔻</span>
                            )}
                          </span>
                        </h3>
                        <div className="flex gap-8 ml-auto buttons">
                          <div className="flex gap-8 ml-auto buttons">
                            <div className="relative group">
                              <button
                                onClick={() =>
                                  handleGetAllTabs(collection.id, "OPEN ALL TABS")
                                }
                                className="text-[#f65077] text-[18px]"
                              >
                                ↗
                              </button>
                              <div className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px]  opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                {" "}
                                Open All Tabs{" "}
                              </div>
                            </div>
    
                            {/* Open and Close */}
                            <div className="relative group">
                              <button
                                onClick={() =>
                                  handleGetAllTabs(collection.id, "OPEN AND CLOSE")
                                }
                                className="text-[#f65077] text-[18px]"
                              >
                                ⇅
                              </button>
                              <div
                                className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px] 
          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                              >
                                Close All & Open These
                              </div>
                            </div>
    
                            {/* Delete */}
                            <div className="relative group">
                              <button
                                onClick={() => handleDelete(collection.id)}
                                className="text-[#e854d4] hover:text-[#d43b9b] transition"
                              >
                                <svg
                                  fill="#F65077"
                                  version="1.1"
                                  id="Capa_1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  viewBox="0 0 482.428 482.429"
                                  xmlSpace="preserve"
                                  stroke="#e854d4"
                                  className="w-5 h-5"
                                >
                                  <g>
                                    <g>
                                      <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path>
                                      <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path>
                                      <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path>
                                      <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path>
                                    </g>
                                  </g>
                                </svg>
                              </button>
    
                              <div
                                className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px] 
          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                              >
                                Delete Collection
                              </div>
                            </div>
    
                            {/* Edit */}
                            <div className="relative group">
                              <button
                                onClick={() => handleEditClick(collection)}
                                className="text-[#f65077] text-[15px]"
                              >
                                 <img src={img1} alt="Edit" className="object-contain w-4 h-4" />
                              </button>
                              <div
                                className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px] 
          opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                              >
                                Edit Collection
                              </div>
                            </div>
                            {/* <div>
                              <button className="text-[#f65077]">Stared</button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )}
                    {visible[collection.id] && (
                      <CollectionTabs collection_id={collection.id} />
                    )}
                  </li>
                ))}
                </div>
           }
        </div>
    )
};
export  default StaredCollections;