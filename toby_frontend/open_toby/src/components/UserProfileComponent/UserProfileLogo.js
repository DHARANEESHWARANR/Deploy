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
   console.log("UserData:",userData);
   onUserSelect(userData);
   }

   useEffect(()=>{
          console.log("The First Two Letter are :",firstTwoLetters);
   },[firstTwoLetters]);

   const handleDeleteUserWithId = async(event,user_id)=>{
        event.preventDefault();
        console.log("Userid",user_id);
        try{
          const response = await axios.delete(`http://localhost:3001/api/v1/users/${user_id}`);
          console.log("Data Deleted in Users Table");
          try{
             const response_from_tobyusers = await axios.delete(`http://localhost:3001/toby_users/${user_id}`)
             console.log("Data Deleted In Toby_users table");
             console.log("After Deletion Redirect to the Admin User:",userData);
             console.log("The Active User Is:",activeUser);

             setTobyUsers((prevUsers)=>
                   prevUsers.filter((user)=> user.user_id !== user_id)
            )
            //  setActiveUser({
            //   ...activeUser,
            //   lastUpdated: new Date().getTime(), // Add a timestamp to force state update
            // });
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


   useEffect(()=>{
           console.log("tobyUsesr:",tobyUsers);
   },[tobyUsers]);

   return(
   <div className='flex flex-col  justify-between h-screen'>
    <div >
    <div className='initials flex items-center justify-center bg-[#f65077] h-12 w-12 rounded-full mx-2 my-2 mt-3 '>
    <button key={userData.user.id} className='initials-h text-1xl text-white' onClick={(event)=> handleUpateUserNames(event,users_data)}>{firstTwoLetters}</button>
    </div>
     <div>
      { tobyUsers && tobyUsers.map((userData)=>(
              <div className='initials flex items-center justify-center bg-[#f65077] h-12 w-12 rounded-full mx-2 my-2 mt-3 relative'>
              <button key={userData.user_id} className='initials-h text-1xl text-white' onClick={(event)=> handleUpateUserNames(event,userData)}>{userData.user_name.slice(0,2).toUpperCase()}</button>
              <button className='absolute top-2 right-1  text-gray-400 text-xs bg-transparent' onClick={(event)=>handleDeleteUserWithId(event,userData.user_id)}>x</button>
              </div>
      ))}
    </div> 
    <div>
      <button className="text-5xl text-center  text-left ml-3 text-[#b5b2aa]" onClick={(event)=> handleCreateNewUser(event)}>+</button>
    </div>
    </div>

    <div className=''>
    <div className="text-center ">
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

    </div>
    </div>
   )
}

export default UserProfileLogo;