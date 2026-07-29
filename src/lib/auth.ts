import { apiRequest } from "./api";
import { LoginResponse } from "@/types/auth";
import { LoginFormData, RegisterFormData } from "@/schemas/auth.schema";

export function loginUser(data: LoginFormData) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function registerUser(data: RegisterFormData) {
  const { confirmPassword, ...payload } = data;

  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}