// constants/ROUTES.ts
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  USER: "/user",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCT: "/product/:id",
  PROFILE: "/profile",
  CART:"/cart",
  ORDER:"/order",
  CATEGORY: "/category",
  CATEGORY_DETAIL: "/category/:slug",

  category: (slug: string) => `/category/${slug}`,
} as const;
