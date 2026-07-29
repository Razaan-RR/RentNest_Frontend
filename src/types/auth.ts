export interface User {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}