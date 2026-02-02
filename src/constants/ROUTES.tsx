// constants/ROUTES.ts
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  USER: "/user",
  LOGIN: "/login",
  SIGNUP: "/signup",
  PRODUCT: "/product",
  PROFILE: "/profile",

  CATEGORY: "/category",
  CATEGORY_DETAIL: "/category/:slug",

  category: (slug: string) => `/category/${slug}`,
} as const;
