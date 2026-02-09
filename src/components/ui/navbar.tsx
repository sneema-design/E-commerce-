
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/ROUTES";
import { getRole, isAuthenticated, logout } from "@/lib/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const role = getRole();

  const navItemsUser = [
    { label: "Home", link: ROUTES.HOME },
    { label: "Order", link: ROUTES.ORDER },
    { label: "Cart", link: ROUTES.CART },
  ];

  const navItemsAdmin = [
    ...navItemsUser,
    { label: "User", link: ROUTES.USER },
    { label: "Products", link: ROUTES.PRODUCTS },
    {label:"Category",link: ROUTES.CATEGORY}
  ];
  const location=useLocation()
  const navItems = role === "admin" ? navItemsAdmin : navItemsUser;
  const avatar = localStorage.getItem("user_image") || "/default-avatar.png"
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      
      {/* Left side - Logo + Nav links */}
      <div className="flex items-center gap-6">
        <h1
          className="text-xl font-bold cursor-pointer text-primary"
          onClick={() => navigate(ROUTES.HOME)}
        >
          ALPINE
        </h1>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.link}
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => navigate(item.link)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Right side - Auth section */}
      <div className="flex items-center gap-3">
        {isAuthenticated() && (
          <Button
            onClick={() => navigate(ROUTES.PROFILE)}
            className="w-10 h-10 rounded-full p-0 overflow-hidden"
            variant="ghost"
          >
            <img
              src={avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </Button>
        )}

       {location.pathname !== ROUTES.LOGIN && (
  isAuthenticated() ? (
    <Button variant="outline" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button onClick={() => navigate(ROUTES.LOGIN)}>
      Login
    </Button>
  )
)}

      </div>
    </nav>
  );
};
