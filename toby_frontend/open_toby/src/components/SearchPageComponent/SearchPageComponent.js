import React, { useEffect, useState } from 'react';
// import './SearchPageComponent.css';
import axios from 'axios';

const SearchPageComponent = () => {
    const [searchTitle, setSearchTitle] = useState('');
    const [userId, setUserId] = useState(null);
    const [userCollections, setUserCollections] = useState([]);
    const [userTabs, setUserTabs] = useState([]);
    const [searchRequestNamer, setSearchRequestNamer] = useState('all');
    const [filteredData, setFilteredData] = useState([]);
    const [totalMatches, setTotalMatches] = useState(0);

    const handleChange = (event) => setSearchTitle(event.target.value);

    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchAllCollections = async () => {
            if (!userId) return;
            try {
                const response = await axios.get('http://localhost:3001/api/v1/collections', {
                    params: { user_id: userId },
                });
                setUserCollections(response.data.collections);
            } catch (error) {
                console.error('Error fetching collections:', error);
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
                    console.error('Error fetching tabs:', error);
                }
            }
            setUserTabs(allTabs);
        };
        fetchTabsDetails();
    }, [userCollections]);

    useEffect(() => {
        const dataFiltering = () => {
            let filtered = [];
            if (searchRequestNamer === 'collections') {
                filtered = userCollections.filter(
                    (collection) =>
                        collection.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                        collection.description.toLowerCase().includes(searchTitle.toLowerCase())
                );
            } else if (searchRequestNamer === 'tabs') {
                filtered = userTabs.filter((tab) =>
                    tab?.title?.toLowerCase().includes(searchTitle.toLowerCase())
                );
            }
            else{
                const collectionsFiltered = userCollections.filter(
                    (collection) =>
                        collection.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                        collection.description.toLowerCase().includes(searchTitle.toLowerCase())
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
        const types = { Collection: 'collections', Bookmarks: 'tabs', All: 'all' };
        setSearchRequestNamer(types[type] || 'all');
    };

    return (
        <div className="search-page">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search collections or tabs..."
                    value={searchTitle}
                    onChange={handleChange}
                />
                <div className="button-group">
                    <button
                        className={`search-button ${searchRequestNamer === 'all' ? 'active' : ''}`}
                        onClick={() => handleRequestNamerClick('All')}
                    >
                        All
                    </button>
                    <button
                        className={`search-button ${searchRequestNamer === 'collections' ? 'active' : ''}`}
                        onClick={() => handleRequestNamerClick('Collection')}
                    >
                        Collections
                    </button>
                    <button
                        className={`search-button ${searchRequestNamer === 'tabs' ? 'active' : ''}`}
                        onClick={() => handleRequestNamerClick('Bookmarks')}
                    >
                        Tabs
                    </button>
                </div>
            </div>
            <div className="results-container">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index} className="result-item">
                            <h3>{item.title || 'Untitled'}</h3>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No matches found.</p>
                )}
                <p className="total-matches">Total Matches: {totalMatches}</p>
            </div>
        </div>
    );
};

export default SearchPageComponent;
