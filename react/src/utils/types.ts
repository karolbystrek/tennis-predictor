export type UserRole = "USER" | "ADMIN";

export type User = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type JwtToken = {
  value: string;
  expiresIn: number;
};

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
  jwtToken: JwtToken;
  user: User;
};
