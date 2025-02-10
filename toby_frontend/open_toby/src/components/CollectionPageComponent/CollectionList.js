import React, { cloneElement, useEffect, useState, useRef } from "react";
// import './CollectionPage.css';
import CollectionTabs from "./CollectionTabs";
import axios from "axios";
import { useCollectionId } from "../../contexts/CollectionIdContext";
import img1 from '../../assets/edit.png';
import img2 from '../../assets/star.png';
import img3 from '../../assets/unstar.png';
import { useSelection } from "../../contexts/SelectionContext";
const CollectionList = ({
  collections,
  setCollections,
  userData,
  activeUser,
}) => {
  const {clicked,setClicked} = useSelection();
  const collectionRefs = useRef({});
  const user_id = activeUser.user_id;
  const [staringClick,setStaringClick] = useState();
  const { collectionId, setCollectionId } = useCollectionId();
  const [optionalCollectionId, setOptionalCollectionId] = useState(null);
  const [collectionTitle, setCollectionTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [visible, setVisible] = useState({});
  const [Sclicked,setSClicked] = useState(0)
  const [expandClick, setExpandClick] = useState(0);
  const [collapeClick, setCollapeClick] = useState(0);
  const [tempstaredCollections,settempStaredCollections] = useState([]);
  useEffect(() => {
    console.log("The Collections Are:", collections);
    const initialVisibility = collections.reduce((acc, collection) => {
      acc[collection.id] = true;
      return acc;
    }, {});
    setVisible(initialVisibility);
    if (collectionId && collections.length > 0) {
      setOptionalCollectionId(collectionId);
    }
  }, [collections]);

  useEffect(() => {
    if (collectionId && collections.length > 0) {
      const searched_collection = collections.find(
        (collection) => collection.id === collectionId
      );
      const new_collection = collections.filter(
        (collection) => collection.id !== collectionId
      );
      if (collections[0]?.id !== collectionId) {
        const new_data = [searched_collection, ...new_collection];
        if (new_data.length === collections.length) {
          setCollections(new_data);
        }
      }
    }
  }, [optionalCollectionId, collections]);

  const handleExpandClick = () => {
    if (expandClick == 0) {
      const initialVisibility = collections.reduce((acc, collection) => {
        acc[collection.id] = true;
        return acc;
      }, {});
      setVisible(initialVisibility);
      setExpandClick(1);
      setCollapeClick(0);
    }
  };

  const handleCollapeClick = () => {
    if (collapeClick == 0) {
      const initialVisibility = collections.reduce((acc, collection) => {
        acc[collection.id] = false;
        return acc;
      }, {});
      setVisible(initialVisibility);
      setCollapeClick(1);
      setExpandClick(0);
    }
  };
  const handleClick = () => {
    Sclicked === 0 ? setSClicked(1) : setSClicked(0);
  };

  const handleChange = (event) => {
    setCollectionTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/collections",
        {
          collection: {
            title: collectionTitle,
            description: "The Description of the Book",
            user_id: user_id,
          },
        }
      );

      const newCollection = response.data.collection;
      setCollections((prevCollections) => [newCollection, ...prevCollections]);
      setCollectionTitle("");
      setSClicked(0);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (collection_id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/collections/${collection_id}`
      );
      setCollections((prevCollections) =>
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
      setCollections((prevCollections) => {
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

  const handleVisibilityToggle = (collection_id) => {
    setVisible((prevVisibility) => ({
      ...prevVisibility,
      [collection_id]: !prevVisibility[collection_id], // Toggle visibility for the specific collection
    }));
  };
  const handleFilterClick = async (event, message) => {
    event.preventDefault();
    console.log("Tag Filter is Clicked");
    console.log("The Collections are:", collections);
    if (message === "AtoZ") {
      console.log("Asscending Order Buddy");
      const sortedCollectionDesc = [...collections].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setCollections(sortedCollectionDesc);
    } else if (message == "ZtoA") {
      console.log("Desending Order Buddy");
      const sortedCollectionDesc = [...collections].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setCollections(sortedCollectionDesc);
    }
  };

  const handleStaredCollectionsClick = async(event, stared_collection) => {
    event.preventDefault();
    console.log("Hey Miss Amingo");
    console.log(stared_collection);
    try{
     const response= await axios.post("http://localhost:3001/api/v1/stared",{
      'collection_id': stared_collection.id
     });
     setClicked(1);

    }
    catch(error){
      console.log(error.message);
    }
};


  return (
    <div className="">
      <div className="border w-full h-[75px] flex items-center px-6">
        {/* Left-side buttons */}
        <div className="flex space-x-9">
          <button className="text-[15px] text-[#f65077]">DRAG AND DROP</button>
          <button
            className="text-[15px] text-[#f65077]"
            onClick={(event) => handleFilterClick(event, "AtoZ")}
          >
            EARLIEST FIRST ⬆
          </button>
          <button
            className="text-[15px] text-[#f65077]"
            onClick={(event) => handleFilterClick(event, "ZtoA")}
          >
            LATEST FIRST ⬇{" "}
          </button>
          <button
            onClick={handleExpandClick}
            className="text-[15px] text-[#f65077]"
          >
            EXPAND
          </button>
          <button
            onClick={handleCollapeClick}
            className="text-[15px] text-[#f65077]"
          >
            COLLAPSE
          </button>
        </div>

        {/* Right-side button */}
        <div className="ml-auto">
          <button
            onClick={handleClick}
            className="text-[13px] border bg-[#f65077] text-[#ffffff] p-1 rounded-md"
          >
            + ADD COLLECTION
          </button>
        </div>
      </div>
      {Sclicked === 1 && (
        <form
          onSubmit={handleSubmit}
          className="p-4 mx-10 mt-4 bg-white rounded-lg shadow-lg collectionTitleForm"
        >
          <div className="collectionTitleInFormDiv">
            <input
              type="text"
              placeholder="Enter Your Title Here"
              value={collectionTitle}
              onChange={handleChange}
              required
              className="w-full p-2 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <button
            onClick={handleClick}
            className="px-3 py-1 font-semibold text-gray-500 transition duration-200 border border-gray-300 rounded-md collectionCancelInFormButton hover:text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 font-semibold text-white transition duration-200 bg-pink-500 rounded-md collectionSaveInFormButton hover:bg-pink-600"
          >
            Save
          </button>
        </form>
      )}
      <div className="overflow-y-auto h-screen max-h-[calc(100vh-100px)]">
        <ul className="">
          {collections &&
            collections.map((collection) => (
              <li key={collection.id} className="collection-item snap-y">
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
                        <div>
                          {collection.stared ==1 ?
                          <div className="relative group">
                          <button className="text-[#f65077]" onClick={(event)=>handleStaredCollectionsClick(event,collection)}> <img src={img3} alt="Edit" className="object-contain w-4 h-4" /></button>
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px] 
      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                          >
                            The Collection is Stared
                          </div>
                          </div>:
                          <div className="relative group">
                          <button className="text-[#f65077]" onClick={(event)=>handleStaredCollectionsClick(event,collection)}> <img src={img2} alt="Edit" className="object-contain w-4 h-4" /></button>
                          <div
                            className="absolute left-1/2 -translate-x-1/2 top-8 px-3 py-1 text-white bg-pink-500 rounded-md text-[15px] 
      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50"
                          >
                            The Collection is UnStared
                          </div>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {visible[collection.id] && (
                  <CollectionTabs collection_id={collection.id} />
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CollectionList;
