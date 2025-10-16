import type { LoginRequest, LoginResponse } from "../hooks/useLogin.ts";
import type { SignupRequest } from "../hooks/useSignup.ts";
import { API_BASE_URL, ENDPOINTS } from "../config/api.ts";

export const authenticationService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Invalid username or password");
    }

    return response.json();
  },

  signup: async (credentials: SignupRequest): Promise<void> => {
    const response = await fetch(`${ENDPOINTS.SIGNUP}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }

    return response.json();
  },
};
export { API_BASE_URL };
