import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/ROUTES";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Product from "./pages/Product";
import { Navbar } from "./components/ui/navbar";
import ProtectRoutes, {
  AdminProtectRoutes,
} from "./components/ProtectedRoutes";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Products from "./pages/Products";
function App() {
  
  return (
    <>
      <Navbar />

      <Toaster richColors position="top-right" />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.PRODUCT} element={<Product />} />
        <Route element={<ProtectRoutes />}>
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.ORDER} element={<Order />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
        <Route element={<AdminProtectRoutes />}>
          <Route path={ROUTES.USER} element={<User />} />
          <Route path={ROUTES.PRODUCTS} element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
