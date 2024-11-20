import React , {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileSearch = () =>{


    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/searchPage');
    };
    
      return(
        <>
        <div className='search border'>
          <button  onClick={handleClick} className="p-6 text-1.5xl text-[#363643]">⌕Search</button>
        </div>
        <div className='mt-72 border'>
        </div>
        <div className="mt-48 border h-18 pt-4">
           <button className="text-[#363643] pl-2">👤invite members</button> 
           <button className="text-[#363643] pl-2">⚙️organization settings</button>
        </div>
        {/* <div className='text-center'>
        </div> */}
        </>
     )
}
export default UserProfileSearch;