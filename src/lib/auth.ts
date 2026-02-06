export const setToken = (access_token: string, refresh_token: string) => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("access_token"));
};
export const getRole = () => {
  const role = localStorage.getItem("role");
  return role;
};
export const logout = (): void => {
  localStorage.clear();
  window.location.href = "/login";
};
