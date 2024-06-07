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
import { useSelector } from 'react-redux';
function App() {
    const {user}=useSelector(state=>state.auth);
  return (
   <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex flex-col">
    <BrowserRouter>
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
    </BrowserRouter>
   </div>
  );
}

export default App;
