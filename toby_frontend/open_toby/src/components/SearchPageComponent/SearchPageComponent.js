import React, { useEffect, useState } from 'react';
import './SearchPageComponent.css';
import axios from 'axios';

const SearchPageComponent = () => {
    const [searchTitle, setSearchTitle] = useState("");
    const [userId, setUserId] = useState(null);
    const [userCollections, setUserCollections] = useState([]);
    const [userTabs, setUserTabs] = useState([]);

    const handleChange = (event) => {
        setSearchTitle(event.target.value);
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, [userId]);

    useEffect(() => {

        //fetching all collections
        const fetchAllCollections = async () => {
            if (!userId) return; 

            try {
                const fetchAllCollectionResponse = await axios.get("http://localhost:3001/api/v1/collections", {
                    params: { user_id: userId },
                });
                // setUserCollections(fetchAllCollectionResponse.data.collections);
                console.log(fetchAllCollectionResponse.data.collections);
                setUserCollections(fetchAllCollectionResponse.data.collections);
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };
        fetchAllCollections();

    }, [userId]);

    useEffect(()=>{
    },[userCollections])

    return (
        <div className="parent-div-for-searchPage-component">
            <div className="searchTitle-div">
                <input
                    type="text"
                    id="searchTitle-input"
                    placeholder="Enter Your Search..."
                    name="searchTitle"
                    value={searchTitle}
                    onChange={handleChange}
                    required
                />
                <div className="searchButtons">
                    <button>All</button>
                    <button>Collection</button>
                    <button>Tabs</button>
                </div>
            </div>
        </div>
    );
};

export default SearchPageComponent;
