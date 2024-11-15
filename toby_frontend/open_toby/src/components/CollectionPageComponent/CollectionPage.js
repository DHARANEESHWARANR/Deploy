// CollectionsPage.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CollectionList from './CollectionList';

const CollectionsPage = ({userData}) => {
    const user = userData.user;
    const user_id = user.id;
    const [collections,setCollections] = useState([]);
    useEffect(()=>{
        console.log("useeffect triggered");
        const fetchCollections = async() =>{
               try{
                   const collection_response = await axios.get("http://localhost:3001/api/v1/collections",{
                    params:{
                        user_id: user_id
                    }
                   })
                   console.log("This is reponse result from the server");
                   console.log(collection_response.data.collections)
                   console.log(collections.length);
                   setCollections(collection_response.data.collections);
               }
               catch(error){
                  console.log("Error",error);
               }
        };
        if (user_id) fetchCollections();
    },[user_id]);
    return(
    <div>
        <CollectionList collections={collections}/>
    </div>
    );
};

export default CollectionsPage;
