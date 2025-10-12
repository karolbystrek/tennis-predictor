const API_BASE_URL = "http://localhost:8080";
const API_LOGIN_ENDPOINT = "/auth/login";
const API_SIGNUP_ENDPOINT = "/auth/signup";

export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  expiresIn: number;
};

export const authenticationService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}${API_LOGIN_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },
  async signup(credentials: SignupRequest) {
    const response = await fetch(`${API_BASE_URL}${API_SIGNUP_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    return response.json();
  },
};
