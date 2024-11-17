import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CollectionPage.css'


const CollectionTabs = ({collection_id}) =>{
    const [allTabs,setAllTabs] = useState([]);
    useEffect(()=>{
        const fetchTabs = async() =>{
            try{
              const tabs_response = await axios.get(`http://localhost:3001/api/v1/collections/${collection_id}/bookmarks`);
              console.log("---------------------------------------")
              console.log(tabs_response.data.bookmarks);
              console.log("---------------------------------------")
              setAllTabs(tabs_response.data.bookmarks);
              console.log("---------------------------------------")
              console.log(allTabs);
              console.log("---------------------------------------")

            }
            catch(error){
                 console.log("Error",error);
            }
        }
        if (collection_id) fetchTabs();
    },[collection_id]);

    return(
        <div className="collection-tabs-container">
            <ul className="collection-tabs">
                   {allTabs.map((tab) => (
                    <li key={tab.id} className="tab-item">
                    <img src={tab.favicon_url} alt={`${tab.title} icon`} />
                    <a href={tab.url} target="_blank" rel="noopener noreferrer">
                      {tab.title}
                    </a>
                  </li>
                 ))}
           </ul>
        </div>

    );
}

export default CollectionTabs;