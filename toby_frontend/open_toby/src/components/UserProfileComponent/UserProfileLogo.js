import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserProfileLogo = ({userData,onUserSelect,setActiveUser,activeUser}) =>{
  const navigate = useNavigate();
  const user_id = userData.user.id;
  const user_name = userData.user.first_name;
  const users_data = {
    "user_name": user_name,
    "user_id": user_id
  }
   const firstTwoLetters = user_name?.slice(0, 2);
   const [tobyUsers,setTobyUsers] = useState([]);
   const [userId,setUserId] = useState(userData?.user?.id || null);

   const handleUpateUserNames = async(event,userData)=>{
   event.preventDefault();
   onUserSelect(userData);
   }

   const handleDeleteUserWithId = async(event,user_id)=>{
        event.preventDefault();
        console.log("Userid",user_id);
        try{
          await axios.delete(`http://localhost:3001/api/v1/users/${user_id}`);
          console.log("Data Deleted in Users Table");
          try{
             await axios.delete(`http://localhost:3001/toby_users/${user_id}`)
             setTobyUsers((prevUsers)=>
                   prevUsers.filter((user)=> user.user_id !== user_id)
            )
            setActiveUser((prevUser)=>({
              ...prevUser,
               user_id: userData.user.id,
               user_name: userData.user.first_name,
               lastUpdated: new Date().getTime()
            }))
          } 
          catch(error){
            console.log(error.message);
          }
          console.log("User Deleted Sucessfully");
        }
        catch(error){
          console.log(error.message)
        }
   }

   const handleCreateNewUser = async(event) =>{
    event.preventDefault();
    console.log("The new user Creation is started");
    navigate('/newuser', { state: { userId: userData.user.id,userName: userData.user.first_name} });
   }

   useEffect(()=>{
         
         const getInitialUserData = async()=>{
                try{
                 const response = await axios.get(`http://localhost:3001/toby_users/search?admin_user_id=${userId}`);
                 const user_array = response.data.user;
                 const formatted_users = user_array.map((user)=>({
                  "user_id": user.user_id,
                  "user_name": user.user_name
                 }));
                 setTobyUsers(formatted_users);
                }
                catch(error){
                  console.log(error.message);
                }
              }
              if(userId){
                getInitialUserData();
              }
   },[userId])

   return(
   <div className='flex flex-col  justify-between h-screen'>
    <div >
    <div
          className={`initials flex items-center justify-center h-12 w-12 rounded-full mx-2 my-2 mt-3 border-4 ${
            activeUser?.user_id === user_id ? "bg-[#f65077] border-[#d22f52]" : "bg-[#fca5a5] border-transparent"
          }`}
        >
    <button key={userData.user.id} className='initials-h text-1xl text-white' onClick={(event)=> handleUpateUserNames(event,users_data)}>{firstTwoLetters}</button>
    </div>
     <div>
      { tobyUsers && tobyUsers.map((userData)=>(
              <div
              key={userData.user_id}
              className={`initials flex items-center justify-center h-12 w-12 rounded-full mx-2 my-2 mt-3 relative group border-4 ${
                activeUser?.user_id === userData.user_id
                  ? "bg-[#f65077] border-[#d22f52]"
                  : "bg-[#fca5a5] border-transparent"
              }`}
            >
             <button key={userData.user_id} className="initials-h text-1xl text-white" onClick={(event) => handleUpateUserNames(event, userData)}>
               {userData.user_name.slice(0, 2).toUpperCase()}
             </button>
             <button
               className="absolute top-0 right-0 text-white-400 text-sm bg-transparent rounded-full p-1 opacity-0 group-hover:opacity-100 bg-black-500 transition-opacity duration-300"
               onClick={(event) => handleDeleteUserWithId(event, userData.user_id)}
             >
               ✖
             </button>
           </div>
           
      ))}
    </div> 
    <div>
      <button className="text-5xl text-center  text-left ml-3 text-[#b5b2aa]" onClick={(event)=> handleCreateNewUser(event)}>+</button>
    </div>
    </div>

    <div className=''>
    <div className="text-center ">
      <h1 className='text-3xl text-[#b5b2aa]'>?</h1>
      <h1 className="text-[#363643]">FAQ</h1>
    </div>

    <div className="text-center mt-4">
    <div className='pl-5 text-[#b5b2aa]'>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chakra-icon css-19fgztc" focusable="false"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path><path d="M9 17v1a3 3 0 0 0 6 0v-1"></path></svg>
     </div>
      <h1 className="text-[#363643]">Updates</h1>
    </div>

    <div className='initials flex items-center justify-center bg-[#bd9f5b] h-12 w-12 rounded-full mx-2 my-2 mt-7'>
      <h1 className='initials-h text-1xl text-white'>{firstTwoLetters}</h1>
    </div>
    <h1 className="text-[#363643] mb-4">Accounts</h1>

    </div>
    </div>
   )
}

export default UserProfileLogo;