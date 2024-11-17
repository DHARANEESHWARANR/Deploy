import React, { useState } from 'react';
import './CollectionPage.css';
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

    const handleGetAllTabs = async(collection_id)=>{
           try{
            const response = await axios.get(`http://localhost:3001/api/v1/collections/${collection_id}/bookmarks`);
            console.log(response.data.bookmarks);
            const urls = [];
            response.data.bookmarks.map((tabs)=>{
                urls.push(tabs.url);
            })
            console.log(urls);
            window.postMessage({type: "REMOVE_OTHER_TABS"},"*");
            window.postMessage({type: "OPEN_ALL_TABS",urls: urls},"*");
           }
           catch(error){
            console.log("Error:",error);
           }
    }

    return (
        <div className="divforcollectionlist">
            <button onClick={handleClick}>Create Collection</button>
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
            <ul className="collection-list">
                {collections.map((collection) => (
                    <li key={collection.id} className="collection-item">
                        {editId === collection.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={handleEditChange}
                                />
                                <button onClick={(event) => handleEditSubmit(event,collection.id)}>Save</button>
                                <button onClick={handleEditCancel}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3 className="collection-item-h3">
                                    <b>{collection.title}</b>
                                </h3>
                                <button onClick={() => handleDelete(collection.id)}>Delete</button>
                                <button onClick={() => handleEditClick(collection)}>Edit</button>
                                <button onClick={()=> handleGetAllTabs(collection.id)}>Open All Tabs</button>
                            </>
                        )}
                        <CollectionTabs collection_id={collection.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CollectionList;
