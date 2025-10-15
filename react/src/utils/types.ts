export type UserRole = "USER" | "ADMIN";

export type User = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type Player = {
  id: number;
  firstName: string;
  lastName: string;
  hand: string;
  dateOfBirth: Date;
  ioc: string;
  height: number;
  age: number;
  rank: number;
  rankPoints: number;
  elo: number;
  eloHard: number;
  eloGrass: number;
  eloCarpet: number;
  eloClay: number;
};

export type JwtToken = {
  value: string;
  expiresIn: number;
};
