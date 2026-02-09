import "./App.css";
import { useRoutes } from "react-router-dom";
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
import Category from "./pages/Category";

function App() {
  const element = useRoutes([
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.SIGNUP, element: <SignUp /> },
    { path: ROUTES.PRODUCT, element: <Product /> },

    {
      element: <ProtectRoutes />,
      children: [
        { path: ROUTES.CART, element: <Cart /> },
        { path: ROUTES.ORDER, element: <Order /> },
        { path: ROUTES.PROFILE, element: <Profile /> },
      ],
    },

    {
      element: <AdminProtectRoutes />,
      children: [
        { path: ROUTES.USER, element: <User /> },
        { path: ROUTES.PRODUCTS, element: <Products /> },
        {path :ROUTES.CATEGORY,element:<Category/>}
      ],
    },
  ]);



  return (
    <>
      <Navbar />
      <Toaster richColors position="top-right" />
      {element}
    </>
  );
}

export default App;
