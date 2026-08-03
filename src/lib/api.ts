import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API URL:", API_URL);

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = Cookies.get("accessToken");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(options.headers || {}),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
  }

  return result.data;
}