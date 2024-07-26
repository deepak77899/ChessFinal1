import {
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
  import { PiGameControllerFill } from 'react-icons/pi';
import {useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'

  export function GetFriendsCard({friend}) {
    const {socket}=useSelector(state=>state.game)
    const dispatch=useDispatch();
    const navigate=useNavigate();
const HandleGameReq=(e)=>{

  socket.on('INIT_GAME',(data)=>{
    const GameId=data.gameId;
  

    navigate(`/game/${GameId}`)
   })

   socket.emit('message',{
    type:"create_game"

   })


    socket.emit('message',{
    type:"sendGameReq",
    friendId:friend._id
  })

}
    return (
      <Card className="w-[100%] h-auto py-4">
       <div className="flex justify-around w-[100%]">
       <div className="rounder-full">
       <Avatar  variant="circular" alt="candice" src={`https://api.dicebear.com/5.x/initials/svg?seed=${friend.username }`} />
       </div>
       <div className="flex">
             <div > <Typography variant="h6" color="blue-gray">
               {friend.username}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {friend.email}
              </Typography></div>
            </div>
       <button onClick={HandleGameReq}><PiGameControllerFill className="ml-2 cursor-pointer text-black hover:text-gray-800"/></button>
       </div>
      </Card>
    );
  }