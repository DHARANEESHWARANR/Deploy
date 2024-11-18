import React , {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSearch = () =>{


    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/searchPage'); // Navigate to the new page
    };
    
      return(
        <div className='search'>
            <button onClick={handleClick}>Search.....</button>
        </div>
     )
}
export default UserProfileSearch;