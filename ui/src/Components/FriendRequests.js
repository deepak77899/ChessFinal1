import React, { useEffect } from 'react'
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button
} from "@material-tailwind/react";
import { friendRequestApi ,acceptRequestApi,rejectRequestApi} from "../services/operations/friendRequests";
import { useState } from "react";

export function FriendRequests() {
  const [data,setData]=useState([]);
  useEffect(  () => {
    friendRequestApi(setData);
    console.log("data");
    console.log(data);
  },[]);
  
  const handleAcceptRequest=(email,id)=>{
      acceptRequestApi(email,id);
      setData((prev)=>{
        
      });
  }
  const handleRejectRequest=(email,id)=>{
      rejectRequestApi(email,id);
      setData((prev)=>{
        
      });
  }
  return (
    <div class="flex justify-center items-center h-[90vh]">
 {data.length > 0 ? (
  <Card className="w-96">
    <List>
      {data.map(user => (
        <ListItem key={user._id}>
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src={`https://api.dicebear.com/5.x/initials/svg?seed=${user.username}`}/>
          </ListItemPrefix>
          <div className="flex flex-row justify-between w-[100%]">
            <div>
              <Typography variant="h6" color="blue-gray">
                {user.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {user.email}
              </Typography>
            </div>
            <div className='flex flex-row'>
              <Button  size="sm" variant="text" className="flex items-center  "
              //todo: remove static email
              onClick={()=>handleAcceptRequest("deepak@gmail.com",user._id)}>
                <svg  xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6  text-green-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </Button>
              <Button size="sm" variant="text" className="flex items-center gap-2"
              //todo: remove static email
              onClick={()=>handleRejectRequest("deepak@gmail.com",user._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-800">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  </Card>
) : (
  <h2>No Friend Requests</h2>
)}

    {/* {data} */}
    </div>
  )
}


