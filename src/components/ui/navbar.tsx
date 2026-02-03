import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/ROUTES";
import { isAuthenticated, logout } from "@/lib/auth";
/* ===================== LOGO ===================== */
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      aria-label="Logo"
      role="img"
      fill="none"
      height="1em"
      viewBox="0 0 324 323"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect fill="currentColor" height="323" rx="161.5" width="323" x="0.5" />
      <circle
        cx="162"
        cy="161.5"
        fill="white"
        r="60"
        className="dark:fill-black"
      />
    </svg>
  );
};

/* ===================== HAMBURGER ===================== */
const HamburgerIcon = ({ className }: React.SVGAttributes<SVGElement>) => (
  <svg
    aria-label="Menu"
    className={cn("pointer-events-none", className)}
    fill="none"
    height={16}
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width={16}
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

/* ===================== TYPES ===================== */
export interface NavbarNavLink {
  href: string;
  label: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  navigationLinks?: NavbarNavLink[];
}

/* ===================== LINKS ===================== */
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/category", label: "Category" },
  { href: "/orders", label: "Orders" },
  { href: "/cart", label: "Cart" },
];

/* ===================== NAVBAR ===================== */
export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, navigationLinks = defaultNavigationLinks, ...props }, ref) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const checkWidth = () => {
        if (containerRef.current) {
          setIsMobile(containerRef.current.offsetWidth < 768);
        }
      };

      checkWidth();
      const observer = new ResizeObserver(checkWidth);
      containerRef.current && observer.observe(containerRef.current);

      return () => observer.disconnect();
    }, []);
     const avatar =localStorage.getItem("user_image") ||"/default-avatar.png";

    return (
      <header
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur",
          className,
        )}
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          {/* LEFT */}
          <div className="flex items-center gap-6">
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu>
                    <NavigationMenuList className="flex-col gap-1">
                      {navigationLinks.map((link) => (
                        <NavigationMenuItem key={link.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => navigate(ROUTES.CATEGORY(cat.slug))}
                          >
                            {link.label}
                          </Button>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}

            <button
              className="flex items-center gap-2 font-bold text-xl"
              onClick={() => navigate("/")}
            >
              <Logo />
              ALPINE
            </button>

            {!isMobile && (
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {/* Home */}
                  <NavigationMenuItem>
                    <Button variant="ghost" onClick={() => navigate("/")}>
                      Home
                    </Button>
                  </NavigationMenuItem>

                  {/* Orders */}
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(ROUTES.ORDER)}
                    >
                      Orders
                    </Button>
                  </NavigationMenuItem>

                  {/* Cart */}
                  <NavigationMenuItem>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(ROUTES.CART)}
                    >
                      Cart
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {isAuthenticated() ? (
              <Button
                onClick={() => navigate(ROUTES.PROFILE)}
                className="w-10 h-10 rounded-full p-0 overflow-hidden"
                variant="ghost"
              >
                <img
                  src={`${avatar}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </Button>
            ) : null}
            {isAuthenticated() ? (
              <Button onClick={() => logout()}>Logout</Button>
            ) : (
              <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = "Navbar";

/* ===================== DEMO ===================== */
export function Demo() {
  return (
    <div className="min-h-screen">
      <Navbar />
    </div>
  );
}
