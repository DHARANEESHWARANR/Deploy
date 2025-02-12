// src/contexts/CollectionIdContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
export const CollectionIdContext = createContext();

// Create the provider component
export const CollectionIdProvider = ({ children }) => {
  const [collectionId, setCollectionId] = useState(null); // Initialize with null or default values

  return (
    <CollectionIdContext.Provider value={{ collectionId, setCollectionId }}>
      {children}
    </CollectionIdContext.Provider>
  );
};

// Custom hook to use the CollectionId context
export const useCollectionId = () => {
  return useContext(CollectionIdContext); // Correctly reference the context here
};
