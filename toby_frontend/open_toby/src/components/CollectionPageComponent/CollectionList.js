import React,{useState,useEffect} from 'react'
import './CollectionPage.css'
import CollectionTabs from './CollectionTabs';
const CollectionList = ({collections}) =>{
    console.log("COLLECTION LIST");
    console.log(collections);
    return(
        <div className='divforcollectionlist'>
            <ul className='collection-list'>
            {collections.map((collection) => (
                 <li key={collection.id} className='collection-item'>
                    <h3 className='collection-item-h3'><b>{collection.title}</b></h3>
                    <CollectionTabs collection_id={collection.id}/>
                 </li>
        ))}
            </ul>
        </div>
    );
}

export default CollectionList;