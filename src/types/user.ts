export interface createUserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}
