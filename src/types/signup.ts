
export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar: string;
};

// export type SignupPayload = Omit<SignupFormValues, "confirmPassword">;
export interface CreateUserForm {
  email: string;
  name: string;
  password: string;
  avatar: string;
  role:string;
}