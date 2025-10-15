import type { LoginRequest, LoginResponse } from "../hooks/useLogin.ts";
import type { SignupRequest, SignupResponse } from "../hooks/useSignup.ts";

export const API_BASE_URL = "http://localhost:8080";
const API_LOGIN_ENDPOINT = "/auth/login";
const API_SIGNUP_ENDPOINT = "/auth/signup";

export const authenticationService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_LOGIN_ENDPOINT}`, {
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

  signup: async (credentials: SignupRequest): Promise<SignupResponse> => {
    const response = await fetch(`${API_BASE_URL}${API_SIGNUP_ENDPOINT}`, {
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
