import React, { createContext, useState } from "react";

// Create the context
export const CollectionsContext = createContext();

// Create a provider component
export const CollectionsProvider = ({ children }) => {
    const [collections, setCollections] = useState([]); // Shared state

    return (
        <CollectionsContext.Provider value={{ collections, setCollections }}>
            {children}
        </CollectionsContext.Provider>
    );
};
