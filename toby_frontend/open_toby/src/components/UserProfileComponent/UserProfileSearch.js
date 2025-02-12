import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../contexts/SelectionContext';
import { useState } from 'react';
const UserProfileSearch = ({ activeUser, setActiveUser }) => {
  const navigate = useNavigate();
  const {clicked,setClicked} = useSelection();
  const [isOpen,setIsOpen] = useState(false);
  const handleClick = () => {
    if (activeUser.user_id) {
      navigate('/searchPage', { state: { userId: activeUser.user_id } });
    }
  };

  const handleSelectionClick = (event) =>{
       event.preventDefault();
       setClicked(0)
  }
  const handleSelectionFromStaredCollection = (event) =>{
     event.preventDefault();
     setClicked(1)
  }

  const handleHowToUseToby = () =>{
       setClicked(7);
  }

  return (
    <div className="flex flex-col min-h-screen p4">
      {/* First Two Sections */}
      <div className=""> {/* Adds space below */}
        <div className='search border'>
          <button onClick={handleClick} className="p-6 text-1.5xl text-[#363643]">⌕Search</button>
        </div>
      </div>
      <div className='Card-Limit-Reached w-56 p-5 m-5 border-2 border-pink-500 rounded-lg'>
         <p className='text-[#F65077] '>Reached Card Limit</p>
         <p className='mt-3 text-[#363643]'>Upgrade to access all saved cards.</p>
         <hr className='bg-[#F65077] h-2 w-full rounded-full'></hr>
         <p className='mt-4 text-center bg-[#F65077] text-[#FFFFFF] rounded-lg'>🚀 Upgrade</p>
         <button className='mt-2 ml-10 text-center text-[#F65077] cursor-pointer' onClick={()=> setIsOpen(true)}>Learn More</button>
      </div>
      <div className="flex flex-col text-[#363643] text-lg gap-3 border "> {/* Adds spacing */}
         <div className='flex flex-cols pt-2 pl-3'>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-1uje9ol" focusable="false"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path></svg>
         <button className='pl-1 hover:text-pink-500' onClick={(event)=> handleSelectionFromStaredCollection(event)}> Starred Collections</button>
         </div>
         <div className='flex flex-cols pl-3'>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-1uje9ol" focusable="false"><path d="M3 21l18 0"></path><path d="M9 8l1 0"></path><path d="M9 12l1 0"></path><path d="M9 16l1 0"></path><path d="M14 8l1 0"></path><path d="M14 12l1 0"></path><path d="M14 16l1 0"></path><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path></svg>
         <button className='pl-2 hover:text-pink-500' onClick={(event)=> handleSelectionClick(event)}>My Collections</button>
         </div>
         <div className='flex flex-cols pl-3 '>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-1uje9ol" focusable="false"><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>
         <button className='pl-2 hover:text-pink-500' onClick={handleHowToUseToby}>How To Use Toby</button>
         </div>
         <div className='flex flex-cols pl-3 '>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-1uje9ol" focusable="false"><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>
         <button className='pl-2 hover:text-pink-500'>Course 1</button>
         </div>
         <div className='flex flex-cols pl-3 '>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-1uje9ol" focusable="false"><path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></svg>
         <button className='pl-2 hover:text-pink-500'>Course 2</button>
         </div>
      </div>

      {/* Pushes the last div to the bottom */}
      <div className="mt-auto pb-20 text-[#363643]">
         <div  className='flex flex-cols'>
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-ugv5hc" focusable="false"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path><path d="M16 19h6"></path><path d="M19 16v6"></path><path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path></svg>
         <button className="text-[#363643] pl-2 hover:text-pink-500 ">Invite Members</button>
         </div>
        <div className='flex flex-cols'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-ugv5hc" focusable="false"><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path></svg>
        <button className="text-[#363643] pl-2 hover:text-pink-500">Organization Settings</button>
        </div>
      </div>
      {/* modal view */}
                {isOpen && (
  <div className="fixed inset-0 flex  flex-col-2 flex-row-2 items-center justify-center bg-black bg-opacity-50 z-50 h-full w-full">
    <div className="bg-[#250829] p-6 shadow-lg w-[50%] h-[45%] flex">
        <div className=' w-[70%]'>
          <h1 className='mt-5 text-[20px] text-[#b3b0b0] text-center'>! Reached card limit</h1>
          <h1 className='mt-5 text-[#b3b0b0] text-[20px] pl-4'>You've reached your saved card limit. Upgrade to save more cards.</h1>
          <h1 className='mt-5 text-[#b3b0b0] text-[18px] pl-4'>Upgrade your plan to remove limits and unlock all productivity features.</h1>
          <button className='text-[#b3b0b0] w-full mt-10 border-2  hover:shadow-sm transition-all duration-75' onClick={()=> setIsOpen(false)}>Close</button>
        </div>
        <div className=' w-[30%] text-[#b3b0b0]'>
          <button className='mb-4 pl-60 w-full ml-auto' onClick={()=>setIsOpen(false)}>X</button>
          <h1 className='pt-3 pl-10'>✅ Unlimited saved tabs</h1>
          <h1 className='pt-3 pl-10'>✅ Remove duplicate tabs</h1>
          <h1 className='pt-3 pl-10'>✅ Priority support</h1>
          <h1 className='pt-3 pl-10'>✅ Centralized billing</h1>
          <h1 className='pt-3 pl-10'>✅ Advanced search</h1>
          <button className='w-full mt-6 hover:border-2 ' > 🚀 Upgrade</button>
        </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UserProfileSearch;

