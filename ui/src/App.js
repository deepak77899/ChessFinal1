import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import {ComplexNavbar} from "./Components/NavbarDefault";
import {LoginCard} from "./Components/Auth/LogIn"
import {SimpleRegistrationForm} from "./Components/Auth/SignUp"
import {FriendRequests} from "./Components/FriendRequests";
// import {Game} from "./Components/xyz"
import CreateGame from "./Components/CreateGame";
import JoinGame from "./Components/JoinGame";
import { DrawerDefault } from "./Components/SideBar";
import Game from "./Components/Game"
function App() {

  return (
    <BrowserRouter>
    <div className='flex'>
       <DrawerDefault/>
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
  );
}

export default App;
