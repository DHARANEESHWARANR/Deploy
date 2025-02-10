import { useNavigate } from 'react-router-dom';
import { useSelection } from '../../contexts/SelectionContext';
const UserProfileSearch = ({ activeUser, setActiveUser }) => {
  const navigate = useNavigate();
  const {clicked,setClicked} = useSelection();
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
      <div className='Card-Limit-Reached w-56 p-6 m-5 border-2 border-pink-500 rounded-md'>
         <p>Reached Card Limit</p>
         <p>Upgrade to access all saved cards.</p>
         <button>Upgrade</button>
         <button className='mb-20'>Learn More</button>
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
    </div>
  );
};

export default UserProfileSearch;
