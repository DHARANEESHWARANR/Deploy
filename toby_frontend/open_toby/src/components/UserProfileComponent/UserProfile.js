import React from 'react';
import { useLocation } from 'react-router-dom';
import './UserProfile.css' 
import CollectionsPage from '../CollectionPageComponent/CollectionPage';
import TabList from '../TabListComponent/TabList';
import UserProfileLogo from './UserProfileLogo';
import UserProfileSearch from './UserProfileSearch';
 
const UserProfile = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // Access userData
   
  console.log("This is in Userprofile Page")
  console.log("User Data:", userData); // Log the user data received

  return (
    <div className ="user_profile_page">
      <div className='user_details_with_logo'>
           <h1>Logo</h1>
           <UserProfileLogo/>
      </div>

      <div className='user_profile_search_spacing'>
           <h1>Sedin</h1>
           <UserProfileSearch/>

      </div>

      <div className='user_profile_collection_page'>
          <h1 id="my-collection-text">My Collections</h1>
          <CollectionsPage userData={userData}/>
      </div>

      <div className='user_profile_tabs_page'>
         <h1>open Tabs</h1>
         <TabList/>
  
      </div>

    </div>
  );
};

export default UserProfile;
