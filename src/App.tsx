import "./App.css";
// import Login from './pages/Login'
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "sonner";
function App() {
  return (
    <>
     <Toaster richColors position="top-right" />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home/>}/>
        <Route path={ROUTES.LOGIN} element={<Login/>}/>
        <Route path={ROUTES.SIGNUP} element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
