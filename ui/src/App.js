import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import {ComplexNavbar} from "./Components/NavbarDefault";
import {LoginCard} from "./Components/Auth/LogIn"
import {SimpleRegistrationForm} from "./Components/Auth/SignUp"

function App() {

  return (
    <BrowserRouter>
    <ComplexNavbar/>
     <Routes>
        <Route path="/" element={<HomePage />}>
        </Route>
        <Route path="/Login" element={<LoginCard />}>
        </Route>
        <Route path="/SignUp" element={<SimpleRegistrationForm />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
