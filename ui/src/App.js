import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import {ComplexNavbar} from "./Components/NavbarDefault";
import {LoginCard} from "./Components/Auth/LogIn"
import {SimpleRegistrationForm} from "./Components/Auth/SignUp"
import {FriendRequests} from "./Components/FriendRequests";
import CreateGame from "./Components/CreateGame";
import JoinGame from "./Components/JoinGame";
import { DrawerDefault } from "./Components/SideBar";
import Game from "./Components/Game"
import { useDispatch,useSelector } from 'react-redux'
import { setSocket } from "./slices/gameSlice";
import io from 'socket.io-client'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



const URL = 'http://127.0.0.1:4000'
function App() {
    const {user}=useSelector(state=>state.auth);
    const navigate=useNavigate()
    const dispatch=useDispatch();
    if(user){
    const id=user._id
    const socket = io(URL,{query: {
      "userId": id
    }})



    socket.on('recieveGameReq', (data) => {
      const opponentid = data.reqId;
      const joinGame = window.confirm("Do you want to join the game?");
      if (joinGame) {
        navigate(`/join_game/${opponentid}`);
      }
    });
  
 
  
  
      dispatch(setSocket(socket));
  }



  return (
   <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col">
    
    <div className='flex'>
      {user && <DrawerDefault/>}
       <ComplexNavbar/>
    </div>
   
     <Routes>
        {/* <Route path="/" element={<HomePage />}> */}
        <Route path="/" element={<HomePage/>}>
        </Route>
        {/* <Route path="/game" element={<Game color="white"/>}></Route> */}
        <Route path="/Login" element={<LoginCard />}>
        </Route>
        <Route path="/SignUp" element={<SimpleRegistrationForm />}>
        </Route>
        <Route path="/friendrequests" element={<FriendRequests />}>
        </Route>
        
        <Route path="/create_game/:id" element={<CreateGame />}>  </Route>
        <Route path="/join_game/:id" element={<JoinGame />}></Route>

        <Route path="/game/:id" element={<Game />}></Route>
        
      </Routes>

   </div>
  );
}

export default App;
