import React, { cloneElement, useEffect, useState } from 'react';
import { json, useLocation } from 'react-router-dom';
import CollectionsPage from '../CollectionPageComponent/CollectionPage';
import TabList from '../TabListComponent/TabList';
import UserProfileLogo from './UserProfileLogo';
import UserProfileSearch from './UserProfileSearch';
import { useNavigate } from 'react-router-dom';
import { useCollectionId } from '../../contexts/CollectionIdContext';
import { useBookMarkId } from '../../contexts/BookmarkIdContext';
import { useSelection } from '../../contexts/SelectionContext';
import HowToUseToby from './HowToUseToby';
import axios from 'axios';
import StaredCollections from './StaredCollection';
const UserProfile = () => {
  const {clicked,setClicked} = useSelection();
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData || JSON.parse(localStorage.getItem("userData"));
  const [collectionLength,setCollectionLength] = useState(0);
  const {collectionId,setCollectionId} = useCollectionId();
  const {bookMarkId,setBookMarkId} = useBookMarkId();
  const [data,setData] = useState(location.state || {});
  const current_user_data = {
    "user_name": userData.user.first_name,
    "user_id": userData.user.id
  }
  const [activeUser,setActiveUser] = useState(current_user_data? current_user_data: {});

  const updateCurrentAvctiveUser = async(userDetails)=>{
    setActiveUser(userDetails);
    setCollectionId(null);
    setBookMarkId(null);
  }
  const handleSignOutUser = async(event)=>{
    event.preventDefault();
       try{
        navigate("/");
       }
       catch{
        console.log("Error");
       }
  }
  useEffect(()=>{
    if(location.state?.activeUserId?.userId){
      const current_user_data = { "user_id": location.state?.activeUserId?.userId};
     setActiveUser(current_user_data);
    }
  },[data]);
 
 useEffect(()=>{
   console.log("clicked=======================",clicked);
 },[clicked]);

  useEffect(()=>{
    localStorage.setItem("userData",JSON.stringify(userData));
    let userDatas = localStorage.getItem("userData");
  },[]);

  useEffect(()=>{
    const fetchCollections = async() =>{
           try{
              const serverHost = process.env.REACT_APP_SERVER_HOST;
               const collection_response = await axios.get(`http://${process.env.REACT_APP_SERVER_HOST}:3001/api/v1/collections`,{
                params:{
                    user_id: activeUser.user_id
                }
               })
               setCollectionId(collection_response.data.collections.length);
           }
           catch(error){
              console.log("Error",error);
           }
    };
    if (activeUser.user_id) fetchCollections();
},[activeUser]);

  return (
    <div className="flex h-screen">
      {/* Column 1: User Details with Logo */}
      <div className="basis-[5%] border">
        <UserProfileLogo  userData={userData} setActiveUser={setActiveUser} activeUser={activeUser} onUserSelect = {updateCurrentAvctiveUser}/>
      </div>

      {/* Column 2: User Profile Search */}
      <div className="basis-[18%] border">
        <h1 className="text-[ #565250 ] text-[20px] border pl-3 pt-1.5 pb-1">Sedin</h1>
        <UserProfileSearch key={activeUser.last_updated} activeUser={activeUser} setActiveUser={setActiveUser}/> 
      </div>
      {/* Column 3: Collections Page */}
      <div className="basis-[70%] border">
        {/* <HowToUseToby/> */}
      <div className="flex justify-between items-center">
           <h1 className="text-[#565250] text-[22px] pl-3 pt-1.5 pb-1" id="my-collection-text">My Collections | <span className="text-[16px] text-[#565250]">{collectionId ? `${collectionId} collections` : ""}</span></h1>
                <button className="text-[22px] text-[#f65077] px-4" onClick={handleSignOutUser}>Sign Out</button>
       </div>
             {clicked === 0? <CollectionsPage key={activeUser.user_id} activeUser={activeUser} />: clicked ===7? <HowToUseToby/>: <StaredCollections activeUser={activeUser}/>}
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
