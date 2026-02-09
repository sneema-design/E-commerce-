// API user (response)
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

// Create user payload
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

// Update user payload (ALL optional)
export interface UpdateUserDTO {
  name?: string;
  role?: string;
  avatar?: string;
  password?: string;
}

// Login
export interface LoginUserData {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}
export interface createUserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}