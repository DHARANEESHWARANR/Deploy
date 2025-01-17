// CollectionsPage.js
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import CollectionList from './CollectionList';
import { CollectionsContext } from '../../contexts/CollectionsContext';
const CollectionsPage = ({activeUser}) => {
    const user_id = activeUser.user_id;
    // const {collections,setCollections} = useContext(CollectionsContext);
    const [collections,setCollections] = useState([]);
    useEffect(()=>{
        console.log("The active user in the collection  page is:",activeUser);
        console.log("The Id came is like:",activeUser.user_id);
        const fetchCollections = async() =>{
               try{
                   console.log("The user_id is:",activeUser.user_id);
                   const collection_response = await axios.get("http://localhost:3001/api/v1/collections",{
                    params:{
                        user_id: activeUser.user_id
                    }
                   })
                   console.log("The data is :",collection_response);
                   setCollections(collection_response.data.collections);
               }
               catch(error){
                  console.log("Error",error);
               }
        };
        if (activeUser.user_id) fetchCollections();
    },[activeUser]);
    return(
    <div className=''>
        <CollectionList key={activeUser.user_id} collections={collections} setCollections={setCollections}   activeUser={activeUser}/>
    </div>
    );
};

export default CollectionsPage;
