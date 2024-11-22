import React from 'react';
import { useLocation } from 'react-router-dom';
import CollectionsPage from '../CollectionPageComponent/CollectionPage';
import TabList from '../TabListComponent/TabList';
import UserProfileLogo from './UserProfileLogo';
import UserProfileSearch from './UserProfileSearch';

const UserProfile = () => {
  const location = useLocation();
  const { userData } = location.state || {}; // Access userData
  
  return (
    <div className="flex h-screen">
      {/* Column 1: User Details with Logo */}
      <div className="basis-[5%] border">
        <UserProfileLogo />
      </div>

      {/* Column 2: User Profile Search */}
      <div className="basis-[18%] border">
        <h1 className="text-[ #565250 ] text-[20px] border pl-3 pt-1.5 pb-1">Sedin</h1>
        <UserProfileSearch /> 
      </div>

      {/* Column 3: Collections Page */}
      <div className="basis-[70%] border">
        <h1 className="text-[ #565250 ] text-[22px] border h-[42px] pl-3 pt-1.5 pb-1" id="my-collection-text">
          My Collections
        </h1>
        <CollectionsPage userData={userData} />
      </div>

      {/* Column 4: Open Tabs */}
      <div className="basis-[20%] border h-[45px] w-full">
        <h1 className="text-[ #565250 ] text-[20px]  pl-32 pt-1.5 pb-1.5 w-full">Open Tabs</h1>
        <TabList />
      </div>
    </div>
  );
};

export default UserProfile;
