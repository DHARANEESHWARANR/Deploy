import React, {useState,useEffect} from 'react';
import axios from 'axios';

const UserProfileLogo = ({userData,onUserSelect}) =>{
  const user_id = userData.user.id;
  const user_name = userData.user.first_name;
  const users_data = {
    "user_name": user_name,
    "user_id": user_id
  }
   const firstTwoLetters = user_name?.slice(0, 2);
   const [tobyUsers,setTobyUsers] = useState([]);
   const [userId,setUserId] = useState(userData?.user?.id || null);

   const handleNewUserNames = async(event)=>{
    event.preventDefault();
     const new_user = {
      first_name:"ASVINA NANDHA",
      last_name:"VT",
      email:'geevan12356@gmail.com',
      password:'password'
     }
     try{
      const response= await axios.post("http://localhost:3001/api/v1/users",{
        user: new_user
     })
     const normal_user_id = response.data.user.id;
             try{
                 const response = await axios.post("http://localhost:3001/toby_users",{
                  toby_user:{
                    user_id: normal_user_id,
                    admin_user_id: userData.user.id,
                    user_name: "DHARANEESH"
                  }
                 })
                }
              catch(error){
                 console.log(error.message);
                }
     }
     catch(error){ 
      if(error.response){
        console.log(error.response.data);
        alert(error.response.data.details);
      } 
      else{
        console.log(error.message);
      }

      }
   }

   const handleUpateUserNames = async(event,userData)=>{
   event.preventDefault();
   onUserSelect(userData);
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
    <div>
    <div className='initials flex items-center justify-center bg-[#f65077] h-12 w-12 rounded-full mx-2 my-2 mt-3'>
    <button key={userData.user.id} className='initials-h text-1xl text-white' onClick={(event)=> handleUpateUserNames(event,users_data)}>{firstTwoLetters}</button>
    </div>
     <div>
      { tobyUsers && tobyUsers.map((userData)=>(
              <div className='initials flex items-center justify-center bg-[#f65077] h-12 w-12 rounded-full mx-2 my-2 mt-3'>
              <button key={userData.user_id} className='initials-h text-1xl text-white' onClick={(event)=> handleUpateUserNames(event,userData)}>{userData.user_name.slice(0,2)}</button>
              </div>
      ))}
    </div> 
    <div>
      <button className="text-5xl text-center  text-left ml-3 text-[#b5b2aa]" onClick={(event)=>handleNewUserNames(event)}>+</button>
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