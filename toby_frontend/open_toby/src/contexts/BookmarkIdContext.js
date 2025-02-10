import React, { createContext, useState, useContext } from "react";

export const BookmarkIdContext = createContext();

//create the provider component
export const BookmarkIdProvider = ({children}) =>{
    const [bookMarkId,setBookMarkId] = useState(null);
    
    return(
        <BookmarkIdContext.Provider value={{bookMarkId,setBookMarkId}}>{children}
        </BookmarkIdContext.Provider>
    );
};

export const useBookMarkId =()=>{
    return useContext(BookmarkIdContext);
}