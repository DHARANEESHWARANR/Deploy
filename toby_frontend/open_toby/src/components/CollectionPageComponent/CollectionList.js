import React, { cloneElement, useEffect, useState } from 'react';
// import './CollectionPage.css';
import CollectionTabs from './CollectionTabs';
import axios from 'axios';


const CollectionList = ({ collections, setCollections, userData }) => {
    const user_id = userData.user.id;

    const [clicked, setClicked] = useState(0);
    const [collectionTitle, setCollectionTitle] = useState("");
    const [editId, setEditId] = useState(null); 
    const [editTitle, setEditTitle] = useState(""); 
    const[visible,setVisible] = useState({});
    const [expandClick,setExpandClick] = useState(0);
    const [collapeClick,setCollapeClick] = useState(0);

    useEffect(()=>{
        const initialVisibility = collections.reduce((acc,collection)=>{
              acc[collection.id] = true
              return acc
        },{})
        setVisible(initialVisibility);
    },[collections]);

    const handleExpandClick = () =>{
        if(expandClick == 0){
            const initialVisibility = collections.reduce((acc,collection)=>{
                 acc[collection.id] = true
                return acc
            },{})
            setVisible(initialVisibility);
            setExpandClick(1);
            setCollapeClick(0);
        }
    }

    const handleCollapeClick = () =>{
        if(collapeClick == 0){
            const initialVisibility = collections.reduce((acc,collection)=>{
                 acc[collection.id] = false
                return acc
            },{})
            setVisible(initialVisibility);
            setCollapeClick(1);
            setExpandClick(0);
        }
    }
    const handleClick = () => {
        clicked === 0 ? setClicked(1) : setClicked(0);
    };

    const handleChange = (event) => {
        setCollectionTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/v1/collections", {
                collection: {
                    title: collectionTitle,
                    description: "The Description of the Book",
                    user_id: user_id,
                },
            });

            const newCollection = response.data.collection;
            setCollections((prevCollections) => [newCollection, ...prevCollections]);
            setCollectionTitle("");
            setClicked(0);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async (collection_id) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/collections/${collection_id}`);
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
            const response = await axios.put(`http://localhost:3001/api/v1/collections/${collection_id}`, {
                collection: {
                    title: editTitle,
                },
            });
            
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

    const handleGetAllTabs = async(collection_id,message)=>{
           try{
            const response = await axios.get(`http://localhost:3001/api/v1/collections/${collection_id}/bookmarks`);
            const urls = [];
            response.data.bookmarks.map((tabs)=>{
                urls.push(tabs.url);
            })
            
            if (message === "OPEN AND CLOSE"){
            window.postMessage({type:"REMOVE_OTHER_TABS"},"*");
            setTimeout(()=>{
                window.postMessage({type: "OPEN_ALL_TABS",urls: urls},"*");
            },200);
            } 

            if (message === "OPEN ALL TABS"){
                window.postMessage({type: "OPEN_ALL_TABS",urls: urls},"*");
                } 
           }
           catch(error){
            console.log("Error:",error);
           }
    }
    
    const handleVisibilityToggle = (collection_id) => {
        setVisible((prevVisibility) => ({
            ...prevVisibility,
            [collection_id]: !prevVisibility[collection_id], // Toggle visibility for the specific collection
        }));
    };

    return (
        <div className="divforcollectionlist">
            <div className="border w-full h-[75px] pt-6">
             <button className="text-[15px] pl-10 text-[#f65077]">DRAG AND DROP</button>
             <button className="text-[15px] pl-6 text-[#f65077]">TAG FILTER</button>
             <button onClick={handleExpandClick}className="text-[15px] pl-6 text-[#f65077]">EXPAND</button>
             <button onClick={handleCollapeClick} className="text-[15px] pl-6 text-[#f65077]">COLLAPSE</button>
             <button onClick={handleClick} className="text-[13px] ml-80 border bg-[#f65077] text-[#ffffff] p-1 rounded-md">+ ADD COLLECTION</button>
            </div>
            {clicked === 1 && (
                <form onSubmit={handleSubmit} className="collectionTitleForm">
                    <div className="collectionTitleInFormDiv">
                        <input
                            type="text"
                            placeholder="Enter Your Title Here"
                            value={collectionTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button onClick={handleClick} className="collectionCancelInFormButton">
                        Cancel
                    </button>
                    <button type="submit" className="collectionSaveInFormButton">
                        Save
                    </button>
                </form>
            )}
            <div className='h-30'>
            <ul className="collection-list">
                {collections && collections.map((collection) => (
                    <li key={collection.id} className="collection-item snap-y">
                        {editId === collection.id ? (
                            <div className="tailwind">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={handleEditChange}
                                />
                                <button onClick={(event) => handleEditSubmit(event,collection.id)} >Save</button>
                                <button onClick={handleEditCancel} className='text-white-100'>Cancel</button>
                            </div>
                        ) : (
                            <div className="flex h-[60px] items-center justify w-full">
                                <h3 className="collection-item-h3 text-gray-500 pl-8 text-[25px] ">
                                    <b>{collection.title}</b>
                                    <span
                                            onClick={() => handleVisibilityToggle(collection.id)}
                                            className="text-[20px] cursor-pointer"
                                        >
                                            {visible[collection.id] ? (
                                                <span className="text-[30px] text-pink-500 ml-2 pb-[12px]">›</span>
                                            ) : (
                                                <span>🔻</span>
                                            )}
                                        </span>
                                </h3>
                                <button onClick={()=> handleGetAllTabs(collection.id,"OPEN ALL TABS")} className=' ml-96 text-[#f65077] text-[18px]'>↗</button>
                                <button onClick={()=> handleGetAllTabs(collection.id,"OPEN AND CLOSE")} className=' pl-[20px] text-[#f65077] text-[18px]'>⇅</button>
                                <button onClick={() => handleDelete(collection.id)} className=' pl-[20px] text-[#f65077] text-[15px]'>Delete</button>
                                <button onClick={() => handleEditClick(collection)} className=' pl-[20px] text-[#f65077] text-[15px]'>Edit</button>
                            </div>
                        )}
                          {visible[collection.id] && (<CollectionTabs collection_id={collection.id} />)}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default CollectionList;


