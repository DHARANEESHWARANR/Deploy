import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CollectionsContext } from '../../contexts/CollectionsContext';
import { useContext } from 'react';

// import './CollectionPage.css'


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

    const handleTabsDeletion = async(bookmark_id)=>{
      try{
        const response = await axios.delete(`http://localhost:3001/api/v1/collections/${collection_id}/bookmarks/${bookmark_id}`)
        const updated_tabs = allTabs.filter((tab)=>
          tab.id !== bookmark_id
        );
        setAllTabs(updated_tabs);
      }
      catch(error){
        console.log("Error:",error);
      }
    }

    return(
      <div className="collection-tabs-container p-4 pl-10 pr-16  pb-10 border-b">
      <ul className="collection-tabs grid grid-cols-3 gap-4 justify">
        {allTabs && allTabs.map((tab) => (
          <li
          key={tab.id}
          className="tab-item shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 hover:border-[#B7B7CE] hover:bg-[#F5F5FB] hover:translate-y-1 transition-transform w-50"
        >
          <div className='flex'>
          <img
            src={tab.favicon_url}
            alt={`${tab.title} icon`}
            className="w-6 h-6 mb-2"
          />
          <a
            href={tab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 font-semibold text-center pb-2 pl-4"
          >
            {tab.title.slice(0, 12)}
            {tab.title.length > 12 && '...'}
          </a>
          </div>
          <div className="w-full">
            <h1 className="text-sm font-medium  text-gray-400 border-t border-gray-300 pt-1">
            {tab.title && tab.title.slice(0, 10)}
            {tab.title.length > 10 && '...'}
            </h1>
          </div>
          <button className="absolute bottom-20 right-1  group-hover:flex items-center justify-center text-gray-400 bg-transparent p-1 w-8 h-8 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-200 flex items-center justify-center" onClick={()=> handleTabsDeletion(tab.id)}>x</button>
        </li>
        ))}
      </ul>
    </div>
    

    );
}

export default CollectionTabs;