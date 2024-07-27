import React, { useEffect ,useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { setColor ,setSocket} from "../slices/gameSlice";
import QRCode from 'qrcode.react';
import { FaClipboard } from 'react-icons/fa';
import {  toast } from "react-toastify";
const { v4: uuidv4 } = require('uuid');


function generateGameId() {
  const uniquePart = uuidv4().replace(/-/g, '').substring(0, 7);
  return uniquePart;
}

function CreateGame() {
  const dispatch=useDispatch();
    let { id } = useParams();
    const [gameLink,setGameLink]=useState("")
    const [shortId,setShortId]=useState("");
const navigate=useNavigate();


const {socket}=useSelector(state=>state.game);

 console.log("ye h apna socket",socket);
useEffect(()=>{
  let shortIDv=generateGameId();
  setShortId(shortIDv);
    setGameLink(`${process.env.REACT_APP_FRONT_END_URL}/join_game/${id}`);
socket.on('INIT_GAME',(data)=>{
  const GameId=data.gameId;
  const color=data.color;
  dispatch(setColor(color));

  navigate(`/game/${GameId}`)
 })


},[id])
useEffect(()=>{
  if(shortId!=""){
    socket.emit('message',{
      type: "create_game",
      shortGameId:shortId
    })    
  }
},[shortId]);
const copyToClipboard = () => {
  toast.success("Link Copied to clipboard");
  navigator.clipboard.writeText(gameLink);
};

  return (
     <div className='flex-grow flex items-center justify-center flex-col '>

      <h3 className='text-2xl'>Share this game id</h3>
    <p className='border-2 p-2 border-blue-gray-900 '>{shortId}  </p>
      <h3 className='text-2xl text-center'>or Share this link with your friend to play</h3>
   <div className='flex my-4  max-w-[100vw] flex-col sm:flex-row justify-center' > 
    <p className='border-2 p-2 border-blue-gray-900 text-ellipsis overflow-hidden w-[80%] mx-auto'>{gameLink}  </p>
  <div className='flex justify-center items-center mt-3 sm:mt-0'>
  <FaClipboard 
                className="ml-2 cursor-pointer text-black hover:text-gray-800" 
                onClick={copyToClipboard} 
              />
  </div>
   </div>
   <p className='my-3'>or Scan the OR code</p>
   <QRCode value={gameLink} />
     </div>
    
    
  )
}

export default CreateGame