import React, { cloneElement, useState } from 'react';
// import './CollectionPage.css';
import CollectionTabs from './CollectionTabs';
import axios from 'axios';


const CollectionList = ({ collections, setCollections, userData }) => {
    const user_id = userData.user.id;

    const [clicked, setClicked] = useState(0);
    const [collectionTitle, setCollectionTitle] = useState("");
    const [editId, setEditId] = useState(null); 
    const [editTitle, setEditTitle] = useState(""); 

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
            console.log("Updated Collection from response:", updatedCollection);
    
           
            setCollections((prevCollections) => {
                const updatedCollections = prevCollections.map((collection) =>
                    collection.id === collection_id ? updatedCollection : collection
                );
                console.log("Updated collections inside setCollections:", updatedCollections);
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
            console.log(response.data.bookmarks);
            const urls = [];
            response.data.bookmarks.map((tabs)=>{
                urls.push(tabs.url);
            })
            
            if (message === "OPEN AND CLOSE"){
            window.postMessage({type:"REMOVE_OTHER_TABS"},"*");
            setTimeout(()=>{
                window.postMessage({type: "OPEN_ALL_TABS",urls: urls},"*");
                console.log("Opening after the closing");
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

   const SomeFucntion = async()=>{
    
   }
    return (
        <div className="divforcollectionlist">
            <div className="border w-full h-[75px] pt-6">
             <button className="text-[15px] pl-10 text-[#f65077]">DRAG AND DROP</button>
             <button className="text-[15px] pl-6 text-[#f65077]">TAG FILTER</button>
             <button className="text-[15px] pl-6 text-[#f65077]">VIEW</button>
             <button className="text-[15px] pl-6 text-[#f65077]">EXPAND</button>
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
                                <button onClick={handleEditCancel} className='text-pink-100'>Cancel</button>
                            </div>
                        ) : (
                            <div className="flex h-[60px] items-center justify w-full">
                                <h3 className="collection-item-h3 text-gray-500 pl-8 text-[25px] ">
                                    <b>{collection.title}</b>
                                </h3>
                                <button onClick={()=> handleGetAllTabs(collection.id,"OPEN ALL TABS")} className=' ml-96 text-[#f65077] text-[18px]'>↗</button>
                                <button onClick={()=> handleGetAllTabs(collection.id,"OPEN AND CLOSE")} className=' pl-[20px] text-[#f65077] text-[18px]'>⇅</button>
                                <button onClick={() => handleDelete(collection.id)} className=' pl-[20px] text-[#f65077] text-[15px]'>Delete</button>
                                <button onClick={() => handleEditClick(collection)} className=' pl-[20px] text-[#f65077] text-[15px]'>Edit</button>
                            </div>
                        )}
                        <CollectionTabs collection_id={collection.id} />
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default CollectionList;
