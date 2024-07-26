import React, { useEffect, useState } from "react";
import {SearchCard} from "./SearchCard";
import {GetFriendsCard} from "./GetFriendsCard"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  PlusIcon,
  UserCircleIcon,
  Cog6ToothIcon,
 
} from "@heroicons/react/24/solid";
import { seachUserAPI } from "../services/operations/seachUserAPI";
import { getFriendsAPI } from "../services/operations/getFriendsAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

export function TabsWithIcon() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [searchItem,setSearchItem]=useState([]);
  const [searchTerm,setSeachTerm]=useState("");
  const [friends,setFriends]=useState([]);
  useEffect(()=>{
    getFriendsAPI(dispatch,navigate,setFriends,user);
  },[])

  const handleChange=(e)=>{
    setSeachTerm(e.target.value);
  }
  const handleSeach=(e)=>{
    
    seachUserAPI(dispatch,navigate,searchTerm,setSearchItem);
  
  }

  const data = [
    {
      label: "Friends",
      value: "Friends",
      icon: Square3Stack3DIcon,
      desc:
      
        <div>
      {friends.map((friend)=><div>
        <GetFriendsCard friend={friend}/>
      </div>)}
        </div>
      
    },
    {
      label: "Add",
      value: "Add",
      icon: PlusIcon,
      desc: <div>
      <div className='flex'>
     <input className='border-black border-2 rounded-lg ' type="text" value={searchTerm} onChange={handleChange} />
     <button type='button' onClick={handleSeach} className='ml-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</button>
     </div>
    {searchItem.map((item)=>(
        <SearchCard item={item} setSearchItem={setSearchItem}/>
    ))}
      </div>
    },
  ];


  return (
    <Tabs value="dashboard">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}>
            <div className="flex items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}