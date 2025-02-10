import React, { createContext, useState,useContext } from "react";

// Create the context
export const CollectionsContext = createContext();


// creating a clicking context
export const ClickedContext = createContext();

// Create a provider component
export const CollectionsProvider = ({ children }) => {
    const [staredcollections, setStaredCollections] = useState([]); // Shared state

    return (
        <CollectionsContext.Provider value={{staredcollections, setStaredCollections }}>
            {children}
        </CollectionsContext.Provider>
    );
};


export const useCollections =()=>{
    return useContext(CollectionsContext);
}


