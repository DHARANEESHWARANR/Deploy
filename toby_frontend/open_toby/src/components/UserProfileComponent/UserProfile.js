import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CollectionsPage from '../CollectionPageComponent/CollectionPage';
import TabList from '../TabListComponent/TabList';
import UserProfileLogo from './UserProfileLogo';
import UserProfileSearch from './UserProfileSearch';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // Access userData
  const navigate = useNavigate();
  const current_user_data = {
    "user_name": userData.user.first_name,
    "user_id": userData.user.id
  }
  const [activeUser,setActiveUser] = useState(current_user_data? current_user_data: {});

  const updateCurrentAvctiveUser = async(userDetails)=>{
    console.log("Hello I am clicked");
    console.log("The response is :",userDetails);
    setActiveUser(userDetails);
  }
  const handleSignOutUser = async(event)=>{
    event.preventDefault();
       try{
        const user_name = localStorage.getItem("user_id");
        localStorage.removeItem("user_id");
        console.log("The User Id Removed");
        navigate("/");

       }
       catch{
        console.log("Error");
       }
  }

  useEffect(()=>{
    console.log("The active user in the profile page is:",activeUser);
  },[activeUser]);

  return (
    <div className="flex h-screen">
      {/* Column 1: User Details with Logo */}
      <div className="basis-[5%] border">
        <UserProfileLogo userData={userData} onUserSelect = {updateCurrentAvctiveUser}/>
      </div>

      {/* Column 2: User Profile Search */}
      <div className="basis-[18%] border">
        <h1 className="text-[ #565250 ] text-[20px] border pl-3 pt-1.5 pb-1">Sedin</h1>
        <UserProfileSearch key={activeUser.user_id} activeUser={activeUser} /> 
      </div>

      {/* Column 3: Collections Page */}
      <div className="basis-[70%] border">
        <div className="flex">
        <h1 className="text-[ #565250 ] text-[22px] border h-[42px] pl-3 pt-1.5 pb-1" id="my-collection-text">
          My Collections
        </h1>
        <button className="text-[22px] text-[#f65077] boredr h-[42px] pl-96 pt-1.5 pb-1 ml-64" onClick={(event)=>handleSignOutUser(event)}>Sign Out</button>
        </div>
        <CollectionsPage key={activeUser.user_id}  activeUser={activeUser}/>
      </div>

      {/* Column 4: Open Tabs */}
      <div className="basis-[20%] border w-full h-screen">
        <h1 className="text-[ #565250 ] text-[20px]  pl-32 pt-1.5 pb-1.5 w-full">Open Tabs</h1>
        <TabList key={activeUser.user_id} activeUser={activeUser} setActiveUser={setActiveUser} onUserSelect = {updateCurrentAvctiveUser} />
      </div>
    </div>
  );
};

export default UserProfile;
