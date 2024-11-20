import React, {useState,useEffect} from 'react';
import axios from 'axios';

const UserProfileLogo = () =>{
   const user_name = localStorage.getItem("user_name");
   const firstTwoLetters = user_name?.slice(0, 2);
   console.log("THIS IS USERNAME OF THE USER")
   console.log(user_name);
   return(
   <>
    <div className='initials flex items-center justify-center bg-[#f65077] h-12 w-12 rounded-full mx-2 my-2 mt-3'>
    <h1 className='initials-h text-1xl text-white'>{firstTwoLetters}</h1>
    </div>

    <div>
      <h1 className="text-5xl text-center text-[#b5b2aa]">+</h1>
    </div>

    <div className="text-center mt-80">
      <h1 className="text-3xl">?</h1>
      <h1 className="text-[#363643]">FAQ</h1>
    </div>

    <div className="text-center mt-4">
     <span className="">&#128276;</span> 
      <h1 className="text-[#363643]">Updates</h1>
    </div>

    <div className='initials flex items-center justify-center bg-[#bd9f5b] h-12 w-12 rounded-full mx-2 my-2 mt-7'>
      <h1 className='initials-h text-1xl text-white'>{firstTwoLetters}</h1>
    </div>
    <h1 className="text-[#363643] mb-4">Accounts</h1>

    </>
   )
}

export default UserProfileLogo;