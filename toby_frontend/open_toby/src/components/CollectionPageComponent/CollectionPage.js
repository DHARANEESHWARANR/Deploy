// CollectionsPage.js
import axios from 'axios';
import React, { useState, useEffect, useContext, cloneElement } from 'react';
import CollectionList from './CollectionList';
const CollectionsPage = ({activeUser}) => {
    const user_id = activeUser.user_id;
    const [collections,setCollections] = useState([]);
    useEffect(()=>{
        const fetchCollections = async() =>{
               try{
                   const collection_response = await axios.get("http://localhost:3001/api/v1/collections",{
                    params:{
                        user_id: activeUser.user_id
                    }
                   })
                   setCollections(collection_response.data.collections);
               }
               catch(error){
                  console.log("Error",error);
               }
        };
        if (activeUser.user_id) fetchCollections();
    },[activeUser]);

    useEffect(()=>{
         console.log("The Lecngth Of the Collections Are:",collections.length);
    },[collections]);

    return(
    <div className=''>
        <CollectionList key={activeUser.user_id} collections={collections} setCollections={setCollections}   activeUser={activeUser}/>
    </div>
    );
};

export default CollectionsPage;
