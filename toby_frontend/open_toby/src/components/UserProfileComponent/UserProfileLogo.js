import React, {useState,useEffect} from 'react';
import axios from 'axios';

const UserProfileLogo = () =>{
   const user_name = localStorage.getItem("user_name");
   const firstTwoLetters = user_name.slice(0, 2);
   console.log("THIS IS USERNAME OF THE USER")
   console.log(user_name);
   return(
    <div className='initials'>
    <h1 className='initials-h'>{firstTwoLetters}</h1>
    </div>
   )
}

export default UserProfileLogo;