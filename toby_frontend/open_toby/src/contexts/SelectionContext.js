import React, { createContext, useState, useContext } from "react";

export const SelectionContext = createContext();

export const SelectionProvider = ({children}) =>{
    const [clicked,setClicked] = useState(0);
    
    return(
        <SelectionContext.Provider value={{clicked,setClicked}}>{children}
        </SelectionContext.Provider>
    );
};


export const useSelection =()=>{
    return useContext(SelectionContext);
}